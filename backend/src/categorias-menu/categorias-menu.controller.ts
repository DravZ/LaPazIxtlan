import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriasMenuService } from './categorias-menu.service';
import { CreateCategoriasMenuDto } from './dto/create-categorias-menu.dto';
import { UpdateCategoriasMenuDto } from './dto/update-categorias-menu.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('categorias-menu')
export class CategoriasMenuController {
  constructor(private readonly categoriasMenuService: CategoriasMenuService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nueva categoría (ej. Bebidas, Postres)' })
  create(@Body() createCategoriasMenuDto: CreateCategoriasMenuDto) {
    return this.categoriasMenuService.create(createCategoriasMenuDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las categorías' })
  findAll() {
    return this.categoriasMenuService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar categoría por ID' })
  findOne(@Param('id') id: string) {
    return this.categoriasMenuService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Editar nombre o descripción de categoría' })
  update(@Param('id') id: string, @Body() updateCategoriasMenuDto: UpdateCategoriasMenuDto) {
    return this.categoriasMenuService.update(+id, updateCategoriasMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoría' })
  remove(@Param('id') id: string) {
    return this.categoriasMenuService.remove(+id);
  }
}
