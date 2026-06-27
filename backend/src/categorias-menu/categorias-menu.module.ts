import { Module } from '@nestjs/common';
import { CategoriasMenuService } from './categorias-menu.service';
import { CategoriasMenuController } from './categorias-menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasMenu } from './entities/categorias-menu.entity';
import { MenuProducto } from 'src/menu/entities/menu-producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriasMenu,MenuProducto])],
  controllers: [CategoriasMenuController],
  providers: [CategoriasMenuService],
})
export class CategoriasMenuModule {}
