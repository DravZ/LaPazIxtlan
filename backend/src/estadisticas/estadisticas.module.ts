import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadisticasService } from './estadisticas.service';
import { EstadisticasController } from './estadisticas.controller';
import { VentaTicket } from './entities/venta-ticket.entity'; 
import { DetalleOrden } from 'src/ordenes/entities/detalle-orden.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VentaTicket,DetalleOrden])], 
  controllers: [EstadisticasController],
  providers: [EstadisticasService],
})
export class EstadisticasModule {}