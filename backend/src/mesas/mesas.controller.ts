import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MesasService } from './mesas.service';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Mesas')
@Controller('mesas')
export class MesasController {
  constructor(private readonly mesasService: MesasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nueva mesa' })
  create(@Body() createMesaDto: CreateMesaDto) {
    return this.mesasService.create(createMesaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las mesas' })
  findAll() {
    return this.mesasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar mesa por ID' })
  findOne(@Param('id') id: string) {
    return this.mesasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar mesa (ej. Cambiar estado a Ocupada)' })
  update(@Param('id') id: string, @Body() updateMesaDto: UpdateMesaDto) {
    return this.mesasService.update(+id, updateMesaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar mesa' })
  remove(@Param('id') id: string) {
    return this.mesasService.remove(+id);
  }
}