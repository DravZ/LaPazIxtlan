import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VentaTicket } from './entities/venta-ticket.entity';
import { DetalleOrden } from 'src/ordenes/entities/detalle-orden.entity';

@Injectable()
export class EstadisticasService {
  constructor(
    @InjectRepository(VentaTicket)
    private ticketRepository: Repository<VentaTicket>,

    @InjectRepository(DetalleOrden)
    private detalleRepository: Repository<DetalleOrden>,
  ) {}

  async obtenerVentasDelDia() {
    const hoy = new Date();

    const fechaMexico = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Mexico_City' }).format(hoy);

    const resultado = await this.ticketRepository
      .createQueryBuilder('ticket')
      .select('SUM(ticket.total_venta)', 'total_ventas') 
      .where('DATE(ticket.fecha_venta) = :fecha', { fecha: fechaMexico })
      .getRawOne();

    return {
      fecha: fechaMexico,
      total_ingresos: Number(resultado.total_ventas) || 0, 
      mensaje: 'Corte de caja calculado exitosamente'
    };
  }

  async obtenerTopPlatillos() {
    const top = await this.detalleRepository
      .createQueryBuilder('detalle')
      .innerJoin('menu_productos', 'producto', 'producto.id_producto = detalle.id_producto')
      .select('producto.nombre_producto', 'platillo')
      .addSelect('SUM(detalle.cantidad_solicitada)', 'total_vendido')
      .groupBy('producto.id_producto')
      .addGroupBy('producto.nombre_producto')
      .orderBy('total_vendido', 'DESC') 
      .limit(5)
      .getRawMany();

    return top.map(item => ({
      platillo: item.platillo,
      total_vendido: Number(item.total_vendido)
    }));
  }

  async obtenerVentasPorMetodo() {
    const hoy = new Date();
    const fechaMexico = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Mexico_City' }).format(hoy);
    const reporte = await this.ticketRepository
      .createQueryBuilder('ticket')
      .select('ticket.metodo_pago', 'metodo')
      .addSelect('SUM(ticket.total_venta)', 'total')
      .where('DATE(ticket.fecha_venta) = :fecha', { fecha: fechaMexico })
      .groupBy('ticket.metodo_pago')
      .getRawMany();

    return reporte.map(item => ({
      metodo: item.metodo,
      total: Number(item.total)
    }));
  }
}