import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Orden, EstadoOrden } from './entities/orden.entity';
import { DetalleOrden } from './entities/detalle-orden.entity';
import { DetalleOrdenTopping, EstadoTopping } from './entities/detalle-orden-topping.entity';
import { OrdenesGateway } from './ordenes.gateway';
import { Receta } from 'src/inventario/entities/receta.entity';
import { InventarioInsumo } from 'src/inventario/entities/inventario-insumo.entity';
import { MenuProducto } from 'src/menu/entities/menu-producto.entity';
import { Topping } from 'src/menu/entities/topping.entity';

@Injectable()
export class OrdenesService {
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(Orden)
    private readonly ordenRepository: Repository<Orden>,

    private readonly ordenesGateway: OrdenesGateway,
  ) { }

  async create(createOrdenDto: CreateOrdenDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const nuevaOrden = queryRunner.manager.create(Orden, {
        mesero: createOrdenDto.id_mesero ? { id_usuario: createOrdenDto.id_mesero } : undefined,
        mesa: { id_mesa: createOrdenDto.id_mesa },
        estado: EstadoOrden.PENDIENTE,
        total: 0
      });

      let ordenGuardada = await queryRunner.manager.save(nuevaOrden);
      let totalOrden = 0;
      const detallesAGuardar: DetalleOrden[] = [];

      for (const detalleDto of createOrdenDto.detalles) {
        const producto = await queryRunner.manager.findOne(MenuProducto, {
          where: { id_producto: detalleDto.id_producto }
        });

        if (!producto) {
          throw new BadRequestException(`El producto con ID ${detalleDto.id_producto} no existe.`);
        }

        const precioBase = Number(producto.precio);
        let costoExtras = 0;
        const nuevosToppings: DetalleOrdenTopping[] = [];

        if (detalleDto.toppings && detalleDto.toppings.length > 0) {
          for (const topDto of detalleDto.toppings) {
            const toppingDb = await queryRunner.manager.findOne(Topping, { where: { id_topping: topDto.id_topping } });

            if (!toppingDb) {
              throw new BadRequestException(`El ingrediente/topping con ID ${topDto.id_topping} no existe.`);
            }

            if (topDto.estado === EstadoTopping.EXTRA) {
              costoExtras += Number(toppingDb.precio_extra);
            }

            const nuevoDetalleTopping = queryRunner.manager.create(DetalleOrdenTopping, {
              topping: { id_topping: topDto.id_topping },
              estado: topDto.estado
            });
            nuevosToppings.push(nuevoDetalleTopping);
          }
        }

        const precioTotalUnitario = precioBase + costoExtras;
        totalOrden += precioTotalUnitario * detalleDto.cantidad_solicitada;

        const nuevoDetalle = queryRunner.manager.create(DetalleOrden, {
          orden: ordenGuardada,
          producto: { id_producto: detalleDto.id_producto },
          cantidad_solicitada: detalleDto.cantidad_solicitada,
          notas_preparacion: detalleDto.notas_preparacion,
          precio_unitario: precioTotalUnitario,
          detallesToppings: nuevosToppings
        });

        detallesAGuardar.push(nuevoDetalle);
      }

      const detallesGuardados = await queryRunner.manager.save(DetalleOrden, detallesAGuardar);

      ordenGuardada.total = totalOrden;
      await queryRunner.manager.save(Orden, ordenGuardada);

      for (const detalle of detallesGuardados) {
        const recetas = await queryRunner.manager.find(Receta, {
          where: { id_producto: detalle.producto.id_producto },
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
        id_mesa: ordenGuardada.mesa.id_mesa,
        id_mesero: createOrdenDto.id_mesero,
        estado: ordenGuardada.estado,
        mensaje: '¡Llegó un nuevo pedido!',
      });

      this.ordenesGateway.server.emit('actualizacionOrdenes', {
        tipo: "creada",
        estado: ordenGuardada.estado
        // id_orden: orden.id_orden,
      });

      return {
        mensaje: '¡Orden Recibida!',
        orden: ordenGuardada.id_orden,
        total: totalOrden
      };

    } catch (error: any) {
      await queryRunner.rollbackTransaction();
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al guardar la comanda: ' + error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    const ordenes = await this.ordenRepository.find({
      relations: {
        mesero: true,
        mesa: true,
        detalles: {
          producto: true,
          detallesToppings: {
            topping: true
          },
        },
      },
      order: {
        hora_creacion: 'DESC',
      }
    });

    return ordenes.map(orden => {
      if (orden.mesero) {
        delete (orden.mesero as any).password_cifrada;
      }
      return orden;
    });
  }

  async findOne(id: number) {
    const orden = await this.ordenRepository.findOne({
      where: { id_orden: id },
      relations: {
        mesero: true,
        mesa: true,
        detalles: {
          producto: true,
          detallesToppings: {
            topping: true
          },
        },
      },
    });

    if (!orden) {
      throw new NotFoundException(`La orden con ID ${id} no existe`);
    }

    if (orden.mesero) {
      delete (orden.mesero as any).password_cifrada;
    }

    return orden;
  }

  async update(id: number, updateOrdenDto: UpdateOrdenDto) {
    const { estado, nuevosDetalles, id_mesero, id_mesa, motivo_cancelacion, ...datosOrden } = updateOrdenDto as any;

    const orden = await this.ordenRepository.preload({
      id_orden: id,
      ...datosOrden,
      motivo_cancelacion: motivo_cancelacion,
      estado: estado ? (estado as EstadoOrden) : undefined,
      mesero: id_mesero ? { id_usuario: id_mesero } : undefined,
      mesa: id_mesa ? { id_mesa: id_mesa } : undefined,
    });

    if (!orden) throw new NotFoundException(`La orden #${id} no existe en la base de datos`);

    const ahora = new Date();

    if (estado === EstadoOrden.EN_PREPARACION && !orden.hora_confirmacion) {
      orden.hora_confirmacion = ahora;
    } else if (estado === EstadoOrden.LISTA && !orden.hora_lista) {
      orden.hora_lista = ahora;
    } else if (estado === EstadoOrden.ENTREGADA && !orden.hora_entregada) {
      orden.hora_entregada = ahora;
    }

    await this.ordenRepository.save(orden);

    this.ordenesGateway.server.emit('cambioEstadoComanda', {
      id_orden: id,
      estado: orden.estado,
      id_mesero: orden.mesero?.id_usuario,
      id_mesa: orden.mesa?.id_mesa,
    });
    this.ordenesGateway.server.emit('actualizacionOrdenes', {
        tipo: "actualizada",
        estado: estado
        // id_orden: orden.id_orden,
      });

    return { mensaje: `La orden #${id} fue actualizada correctamente.`, orden };
  }

  async remove(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.delete(DetalleOrden, { orden: { id_orden: id } });
      await queryRunner.manager.delete(Orden, { id_orden: id });
      await queryRunner.commitTransaction();
      this.ordenesGateway.server.emit('actualizacionOrdenes', {
        tipo: "eliminada",
        estado: "Descartada"
        // id_orden: orden.id_orden,
      });
      return { mensaje: 'Orden y sus detalles eliminados correctamente' };
    } catch (error: any) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Error al eliminar la orden: ' + error.message);
    } finally {
      await queryRunner.release();
    }
  }
}