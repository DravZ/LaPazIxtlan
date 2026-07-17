import { Module } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { OrdenesController } from './ordenes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orden } from './entities/orden.entity';
import { DetalleOrden } from './entities/detalle-orden.entity';
import { OrdenesGateway } from './ordenes.gateway';
import { DetalleOrdenTopping } from './entities/detalle-orden-topping.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orden, DetalleOrden,DetalleOrdenTopping])],
  controllers: [OrdenesController],
  providers: [OrdenesService, OrdenesGateway],
})
export class OrdenesModule {}
