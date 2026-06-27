import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriasMenuService } from './categorias-menu.service';
import { CreateCategoriasMenuDto } from './dto/create-categorias-menu.dto';
import { UpdateCategoriasMenuDto } from './dto/update-categorias-menu.dto';

@Controller('categorias-menu')
export class CategoriasMenuController {
  constructor(private readonly categoriasMenuService: CategoriasMenuService) {}

  @Post()
  create(@Body() createCategoriasMenuDto: CreateCategoriasMenuDto) {
    return this.categoriasMenuService.create(createCategoriasMenuDto);
  }

  @Get()
  findAll() {
    return this.categoriasMenuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriasMenuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriasMenuDto: UpdateCategoriasMenuDto) {
    return this.categoriasMenuService.update(+id, updateCategoriasMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriasMenuService.remove(+id);
  }
}
