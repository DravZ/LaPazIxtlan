import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadisticasService } from './estadisticas.service';
import { EstadisticasController } from './estadisticas.controller';
import { VentaTicket } from './entities/venta-ticket.entity'; 
import { Orden } from '../ordenes/entities/orden.entity';
import { DetalleOrden } from '../ordenes/entities/detalle-orden.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VentaTicket, Orden, DetalleOrden])],
  controllers: [EstadisticasController],
  providers: [EstadisticasService],
})
export class EstadisticasModule {}