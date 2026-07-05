import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@ApiBearerAuth()
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles('Administrador')
  @Post()

  @UseInterceptors(FileInterceptor('imagen', {
    storage: diskStorage({
      destination: './uploads/menu',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
      }
    })
  }))

  @Post()
  @ApiOperation({ summary: 'Crear nuevo platillo' })
  create(@Body() createMenuDto: CreateMenuDto, @UploadedFile() file: Express.Multer.File) {
    const imagenUrl = file ? `/uploads/menu/${file.filename}` : undefined;
    return this.menuService.create(createMenuDto, imagenUrl);
  }

  @Get('completo')
  @ApiOperation({ summary: 'Obtener el menú completo detallado' })
  getMenuCompleto() {
    return this.menuService.obtenerMenuCompleto();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar platillo por ID' })
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar información del platillo' })
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar platillo del menú' })
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
