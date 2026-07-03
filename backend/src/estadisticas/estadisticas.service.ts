import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Orden, EstadoOrden } from '../ordenes/entities/orden.entity';
import { DetalleOrden } from '../ordenes/entities/detalle-orden.entity';
import { VentaTicket } from './entities/venta-ticket.entity';
import { PagarOrdenDto } from './dto/pagar-orden.dto';

@Injectable()
export class EstadisticasService {
  constructor(private readonly dataSource: DataSource) {}

  async cobrarOrden(pagarOrdenDto: PagarOrdenDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const orden = await queryRunner.manager.findOne(Orden, {
        where: { id_orden: pagarOrdenDto.id_orden },
      });

      if (!orden) {
        throw new NotFoundException(`La orden #${pagarOrdenDto.id_orden} no existe.`);
      }

      const ticketExistente = await queryRunner.manager.findOne(VentaTicket, {
        where: { orden: { id_orden: orden.id_orden } },
      });

      if (ticketExistente) {
        throw new BadRequestException(`La orden #${orden.id_orden} ya fue cobrada con el ticket #${ticketExistente.id_ticket}.`);
      }

      if (orden.estado === EstadoOrden.DESCARTADA) {
        throw new BadRequestException('No puedes cobrar una orden que fue descartada.');
      }

      const nuevoTicket = queryRunner.manager.create(VentaTicket, {
        total_venta: orden.total,
        metodo_pago: pagarOrdenDto.metodo_pago,
        orden: { id_orden: orden.id_orden },
      });

      const ticketGuardado = await queryRunner.manager.save(nuevoTicket);

      if (orden.estado !== EstadoOrden.ENTREGADA) {
        orden.estado = EstadoOrden.ENTREGADA;
        orden.hora_entregada = new Date();
        await queryRunner.manager.save(orden);
      }

      await queryRunner.commitTransaction();

      return {
        mensaje: '¡Cobro realizado con éxito!',
        ticket: ticketGuardado,
      };

    } catch (error: any) {
      await queryRunner.rollbackTransaction();
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al procesar el pago: ' + error.message);
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

}