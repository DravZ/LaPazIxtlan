import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrdenDto, DetalleOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';
import { DataSource, Repository } from 'typeorm';
import { Orden } from './entities/orden.entity';
import { DetalleOrden } from './entities/detalle-orden.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdenesGateway } from './ordenes.gateway';
import { BadRequestException } from '@nestjs/common';
import { Receta } from 'src/inventario/entities/receta.entity';
import { InventarioInsumo } from 'src/inventario/entities/inventario-insumo.entity';


@Injectable()
export class OrdenesService {

  constructor (
    private readonly dataSource: DataSource,
    
    @InjectRepository(Orden)
    private readonly ordenRepository: Repository<Orden>,

    private readonly ordenesGateway: OrdenesGateway,
  ) {}

  async create(createOrdeneDto: CreateOrdenDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const nuevaOrden = queryRunner.manager.create(Orden, {
        mesero: { id_usuario: createOrdeneDto.id_mesero },
        numero_mesa: createOrdeneDto.numero_mesa,
        estado: 'Recibida',
      });
      
      const ordenGuardada = await queryRunner.manager.save(nuevaOrden);

      const detalles = createOrdeneDto.detalles.map(detalle => {
        return queryRunner.manager.create(DetalleOrden, {
          orden: ordenGuardada, 
          producto: { id_producto: detalle.id_producto }, 
          cantidad_solicitada: detalle.cantidad_solicitada,
          notas_preparacion: detalle.notas_preparacion,
        });
      });

      await queryRunner.manager.save(DetalleOrden, detalles);

      for (const detalle of detalles) {
        const recetas = await queryRunner.manager.find(Receta, {
          where: { id_producto: detalle.id_producto },
        });

        for (const receta of recetas) {
          const cantidadADescontar = receta.cantidad_requerida * detalle.cantidad_solicitada;

          const insumo = await queryRunner.manager.findOne(InventarioInsumo, {
            where: { id_insumo: receta.id_insumo },
          });

          if (!insumo) {
            throw new BadRequestException(`Falta configurar el insumo #${receta.id_insumo} en la base de datos.`);
          }

          if (insumo.stock_actual < cantidadADescontar) {
            throw new BadRequestException(`¡Sin stock suficiente de ${insumo.nombre_insumo}! Requerido: ${cantidadADescontar}, Disponible: ${insumo.stock_actual}`);
          }

          insumo.stock_actual = Number(insumo.stock_actual) - Number(cantidadADescontar);
          await queryRunner.manager.save(InventarioInsumo, insumo);
        }
      }

      await queryRunner.commitTransaction();

      this.ordenesGateway.server.emit('nuevaComanda', {
        id_orden: ordenGuardada.id_orden,
        numero_mesa: ordenGuardada.numero_mesa,
        estado: ordenGuardada.estado,
        mensaje: '¡Llegó un nuevo pedido!',
      });

      return { 
        mensaje: '¡Orden Recibida!', 
        orden: ordenGuardada.id_orden 
      };

    } catch (error:any) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Error al guardar la comanda: ' + error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
   return await this.ordenRepository.find({
      relations: {
        mesero: true, 
        detalles: {
          producto: true, 
        },
      },
      order: {
        fecha_creacion: 'DESC', 
      }
    });
  }

  async findOne(id: number) {
    const orden = await this.ordenRepository.findOne({
      where: { id_orden: id },
      relations: {
        detalles: {
          producto: true, 
        },
      },
    });

    if (!orden) {
      throw new NotFoundException(`La orden con ID ${id} no existe`);
    }

    return orden;
  }

  async update(id: number, updateOrdenDto: UpdateOrdenDto) {
    const orden = await this.ordenRepository.preload({
      id_orden: id,
      ...updateOrdenDto,
    });

    if (!orden) {
      throw new NotFoundException(`La orden #${id} no existe en la base de datos`);
    }

    await this.ordenRepository.save(orden);

    this.ordenesGateway.server.emit('cambioEstadoComanda', {
      id_orden: id,
      estado: orden.estado,
    });

    return {
      mensaje: `La orden #${id} ahora está: ${updateOrdenDto.estado}`,
      orden,
    };
  }


  async remove(id: number) {
  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await queryRunner.manager.delete(DetalleOrden, { id_orden: id });

    const resultado = await queryRunner.manager.delete(Orden, { id_orden: id });

    await queryRunner.commitTransaction();
    return { mensaje: 'Orden y sus detalles eliminados correctamente' };
  } catch (error: any) {
    await queryRunner.rollbackTransaction();
    throw new InternalServerErrorException('Error al eliminar la orden: ' + error.message);
  } finally {
    await queryRunner.release();
  }
}
}
