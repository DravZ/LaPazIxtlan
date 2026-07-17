import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Orden, EstadoOrden } from '../ordenes/entities/orden.entity';
import { DetalleOrden } from '../ordenes/entities/detalle-orden.entity';
import { VentaTicket } from './entities/venta-ticket.entity';
import { IsNull, Not } from 'typeorm';
import { PagarMesaDto } from './dto/pagar-mesa.dto';
import { EstadoMesa, Mesa } from 'src/mesas/entities/mesa.entity';

@Injectable()
export class EstadisticasService {
  constructor(private readonly dataSource: DataSource) {}

  async cobrarMesa(pagarMesaDto: PagarMesaDto) {
  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const mesa = await queryRunner.manager.findOne(Mesa,{ 
      where: { id_mesa: pagarMesaDto.id_mesa },
    });

    if (!mesa) throw new NotFoundException(`La mesa #${pagarMesaDto.id_mesa} no existe.`);

    const ordenesPendientes = await queryRunner.manager.find(Orden, {
      where: { 
        mesa: { id_mesa: pagarMesaDto.id_mesa },
        ticket: IsNull(),
        estado: Not(EstadoOrden.DESCARTADA)
      },
    });

    if (ordenesPendientes.length === 0) {
      throw new BadRequestException(`La mesa #${pagarMesaDto.id_mesa} no tiene cuentas pendientes por cobrar.`);
    }

    let totalCuenta = 0;
    ordenesPendientes.forEach(orden => {
      totalCuenta += Number(orden.total);
    });

    const nuevoTicket = queryRunner.manager.create(VentaTicket, {
      total_venta: totalCuenta,
      metodo_pago: pagarMesaDto.metodo_pago,
      mesa: { id_mesa: mesa.id_mesa },
    });

    const ticketGuardado = await queryRunner.manager.save(nuevoTicket);

    for (const orden of ordenesPendientes) {
      orden.ticket = ticketGuardado;
      if (orden.estado !== EstadoOrden.ENTREGADA) {
        orden.estado = EstadoOrden.ENTREGADA;
        orden.hora_entregada = new Date();
      }
      await queryRunner.manager.save(Orden, orden);
    }

    mesa.estado = EstadoMesa.LIBRE;
    await queryRunner.manager.save(Mesa, mesa);

    await queryRunner.commitTransaction();

    return {
      mensaje: '¡Cuenta cobrada con éxito! Mesa liberada.',
      ticket: {
        id_ticket: ticketGuardado.id_ticket,
        total_pagado: ticketGuardado.total_venta,
        metodo: ticketGuardado.metodo_pago,
        ordenes_cobradas: ordenesPendientes.length
      }
    };

  } catch (error: any) {
    await queryRunner.rollbackTransaction();
    if (error instanceof NotFoundException || error instanceof BadRequestException) {
      throw error;
    }
    throw new InternalServerErrorException('Error al procesar el pago de la mesa: ' + error.message);
  } finally {
    await queryRunner.release();
  }
}

  async getDashboardStats() {
    const platilloMasVendido = await this.dataSource.getRepository(DetalleOrden)
      .createQueryBuilder('detalle')
      .select('producto.nombre_producto', 'nombre_platillo')
      .addSelect('SUM(detalle.cantidad_solicitada)', 'total_vendido')
      .leftJoin('detalle.producto', 'producto')
      .groupBy('producto.id_producto')
      .orderBy('total_vendido', 'DESC')
      .limit(1)
      .getRawOne();

    const diaMasGanancias = await this.dataSource.getRepository(Orden)
      .createQueryBuilder('orden')
      .select('DATE(orden.hora_creacion)', 'fecha')
      .addSelect('SUM(orden.total)', 'ingresos')
      .where('orden.estado = :estado', { estado: EstadoOrden.ENTREGADA })
      .groupBy('fecha')
      .orderBy('ingresos', 'DESC')
      .limit(1)
      .getRawOne();

    const horaPico = await this.dataSource.getRepository(Orden)
      .createQueryBuilder('orden')
      .select('EXTRACT(HOUR FROM orden.hora_creacion)', 'hora')
      .addSelect('COUNT(orden.id_orden)', 'cantidad_ordenes')
      .groupBy('hora')
      .orderBy('cantidad_ordenes', 'DESC')
      .limit(1)
      .getRawOne();

    const consumoPromedio = await this.dataSource.getRepository(Orden)
      .createQueryBuilder('orden')
      .select('AVG(orden.total)', 'promedio')
      .where('orden.estado = :estado', { estado: EstadoOrden.ENTREGADA })
      .getRawOne();

    const meseroEstrella = await this.dataSource.getRepository(Orden)
      .createQueryBuilder('orden')
      .select('usuario.nombre_completo', 'nombre_mesero')
      .addSelect('COUNT(orden.id_orden)', 'ordenes_atendidas')
      .leftJoin('orden.mesero', 'usuario')
      .where('orden.id_mesero IS NOT NULL')
      .groupBy('usuario.id_usuario')
      .orderBy('ordenes_atendidas', 'DESC')
      .limit(1)
      .getRawOne();

    const mesaMasUsada = await this.dataSource.getRepository(Orden)
      .createQueryBuilder('orden')
      .select('mesa.id_mesa', 'numero_mesa')
      .addSelect('COUNT(orden.id_orden)', 'veces_usada')
      .leftJoin('orden.mesa', 'mesa')
      .groupBy('mesa.id_mesa')
      .orderBy('veces_usada', 'DESC')
      .limit(1)
      .getRawOne();

    return {
      platillo_estrella: platilloMasVendido || null,
      mejor_dia: diaMasGanancias || null,
      hora_pico: horaPico ? `${horaPico.hora}:00 - ${Number(horaPico.hora) + 1}:00 hrs` : null,
      ticket_promedio: consumoPromedio && consumoPromedio.promedio ? parseFloat(consumoPromedio.promedio).toFixed(2) : '0.00',
      mesero_estrella: meseroEstrella || null,
      mesa_favorita: mesaMasUsada || null,
    };
  }

  async generarCorteCaja() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const finDeHoy = new Date();
    finDeHoy.setHours(23, 59, 59, 999);

    const stats = await this.dataSource.getRepository(VentaTicket) 
      .createQueryBuilder('ticket')
      .select('COUNT(ticket.id_ticket)', 'total_tickets')
      .addSelect('SUM(ticket.total_venta)', 'total_ingresos')
      .addSelect('AVG(ticket.total_venta)', 'promedio_ticket')
      .where('ticket.fecha_venta BETWEEN :inicio AND :fin', { inicio: hoy, fin: finDeHoy })
      .getRawOne();

    const totalTickets = Number(stats.total_tickets) || 0;
    const totalIngresos = Number(stats.total_ingresos) || 0;
    const promedioTicket = Number(stats.promedio_ticket) || 0;

    const fechaStr = hoy.toISOString().slice(0, 10).replace(/-/g, '');
    const folioCorte = `CAJA-${fechaStr}-${Math.floor(1000 + Math.random() * 9000)}`;

    return {
      folio: folioCorte,
      fecha_corte: new Date(),
      resumen_del_dia: {
        tickets_cobrados: totalTickets,
        ingresos_totales: `$${totalIngresos.toFixed(2)}`,
        ticket_promedio: `$${promedioTicket.toFixed(2)}`,
      },
      mensaje: 'Corte de caja validado y generado exitosamente desde los tickets de venta.'
    };
  }

  async obtenerHistorialTickets() {
    return await this.dataSource.manager.find(VentaTicket, {
      relations: {
        mesa: true,
        ordenes: true 
      },
      order: { fecha_venta: 'DESC' }
    });
  }

  async obtenerPreCuenta(id_mesa: number) {
    const mesa = await this.dataSource.manager.findOne(Mesa, {
      where: { id_mesa: id_mesa },
    });

    if (!mesa) throw new NotFoundException(`La mesa #${id_mesa} no existe.`);

    const ordenesPendientes = await this.dataSource.manager.find(Orden, {
      where: {
        mesa: { id_mesa: id_mesa },
        ticket: IsNull(),
        estado: Not(EstadoOrden.DESCARTADA)
      },
      
      relations: {
        detalles: {
          producto: true
        }
      }
    });

    if (ordenesPendientes.length === 0) {
      return { 
        id_mesa: Number(id_mesa),
        mensaje: `La mesa #${id_mesa} no tiene cuentas pendientes.` 
      };
    }

    let totalCuenta = 0;
  
    const desglose: any[] = [];

    ordenesPendientes.forEach(orden => {
      totalCuenta += Number(orden.total);
      
      if (orden.detalles) {
        orden.detalles.forEach(detalle => {
          desglose.push({
            platillo: detalle.producto?.nombre_producto,
            cantidad: detalle.cantidad_solicitada,
          });
        });
      }
    });

    return {
      id_mesa: Number(id_mesa),
      estado_mesa: mesa.estado,
      total_a_pagar: `$${totalCuenta.toFixed(2)}`,
      articulos_consumidos: desglose
    };
  }
}