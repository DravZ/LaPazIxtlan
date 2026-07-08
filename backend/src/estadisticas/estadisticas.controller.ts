import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard'; 
import { Roles } from '../auth/decorators/roles.decorator';
import { RolPersonal } from '../usuarios/entities/usuario.entity';
import { PagarOrdenDto } from './dto/pagar-orden.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('estadisticas')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(RolPersonal.ADMIN) 

@ApiTags('Caja y Estadísticas Administrativas')
@ApiBearerAuth()
@Controller('estadisticas')
export class EstadisticasController {
  constructor(private readonly estadisticasService: EstadisticasService) {}

  @Get('dashboard')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(RolPersonal.ADMIN) 
  @ApiOperation({ summary: 'Ver el resumen general de ventas (Dashboard)' })
  async obtenerEstadisticas() {
    return await this.estadisticasService.getDashboardStats();
  }

  @Post('caja/pagar')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(RolPersonal.ADMIN, RolPersonal.CAJA) 
  @ApiOperation({ summary: 'Cobrar una orden y generar Ticket' })
  async cobrarOrdenCaja(@Body() pagarOrdenDto: PagarOrdenDto) {
    return await this.estadisticasService.cobrarOrden(pagarOrdenDto);
  }

  @Post('corte-caja')
  @ApiOperation({ summary: 'Realizar el corte de caja del turno' })
  async ejecutarCorteDeCaja() {
    return await this.estadisticasService.generarCorteCaja();
  }

}