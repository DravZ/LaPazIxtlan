import { Module } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { OrdenesController } from './ordenes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orden } from './entities/orden.entity';
import { DetalleOrden } from './entities/detalle-orden.entity';
import { OrdenesGateway } from './ordenes.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Orden, DetalleOrden])],
  controllers: [OrdenesController],
  providers: [OrdenesService, OrdenesGateway],
})
export class OrdenesModule {}
