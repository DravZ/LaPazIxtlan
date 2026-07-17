import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { CreateOrdenDto, DetalleOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@Controller('ordenes')
@ApiTags('Órdenes y Comandas') 
@Controller('ordenes')
export class OrdenesController {
  constructor(private readonly ordenesService: OrdenesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nueva orden (Comanda)' })
  create(@Body() createOrdenDto: CreateOrdenDto) {
    return this.ordenesService.create(createOrdenDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las órdenes activas/pasadas' })
  findAll() {
    return this.ordenesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ver detalles de una orden por ID' })
  findOne(@Param('id') id: string) {
    return this.ordenesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar estado de la orden (ej. Entregada)' })
  update(@Param('id') id: string, @Body() updateOrdeneDto: UpdateOrdenDto) {
    return this.ordenesService.update(+id, updateOrdeneDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancelar o eliminar orden' })
  remove(@Param('id') id: string) {
    return this.ordenesService.remove(+id);
  }
}
