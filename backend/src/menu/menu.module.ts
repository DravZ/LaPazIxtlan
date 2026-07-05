import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuProducto } from './entities/menu-producto.entity';
import { CategoriasMenu } from 'src/categorias-menu/entities/categorias-menu.entity';
import { Topping } from './entities/topping.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CategoriasMenu, MenuProducto,Topping])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
