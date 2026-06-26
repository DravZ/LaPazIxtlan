import { Module } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventarioInsumo } from './entities/inventario-insumo.entity';
import { Receta } from './entities/receta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InventarioInsumo, Receta])],
  providers: [InventarioService],
  controllers: [InventarioController],
  exports: [InventarioService],
})
export class InventarioModule {}
