import { Controller, Get, UseGuards } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('Administrador')
@Controller('estadisticas')
export class EstadisticasController {
  constructor(private readonly estadisticasService: EstadisticasService) {}

  @Get('ventas-hoy')
  obtenerVentasDelDia() {
    return this.estadisticasService.obtenerVentasDelDia();
  }

  @Get('top-platillos')
  obtenerTopPlatillos() {
    return this.estadisticasService.obtenerTopPlatillos();
  }

  @Get('ventas-metodo')
  obtenerVentasPorMetodo() {
    return this.estadisticasService.obtenerVentasPorMetodo();
  }
}