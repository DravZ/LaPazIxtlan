import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaMenu } from './entities/categoria-menu.entity';
import { MenuProducto } from './entities/menu-producto.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CategoriaMenu, MenuProducto])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
