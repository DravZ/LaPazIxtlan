import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard'; 
import { Roles } from '../auth/decorators/roles.decorator';
import { RolPersonal } from '../usuarios/entities/usuario.entity';
import { PagarMesaDto } from './dto/pagar-mesa.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Caja y Estadísticas Administrativas')
@ApiBearerAuth()
@Controller('estadisticas')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(RolPersonal.ADMIN) 
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
 async cobrarMesaCaja(@Body() pagarMesaDto: PagarMesaDto) { 
    return await this.estadisticasService.cobrarMesa(pagarMesaDto);
  }

  @Post('corte-caja')
  @ApiOperation({ summary: 'Realizar el corte de caja del turno' })
  async ejecutarCorteDeCaja() {
    return await this.estadisticasService.generarCorteCaja();
  }

  @Get('tickets')
  @ApiOperation({ summary: 'Ver el historial de tickets cobrados' })
  async verTickets() {
    return await this.estadisticasService.obtenerHistorialTickets();
  }

  @Get('caja/cuenta/:id_mesa')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(RolPersonal.ADMIN, RolPersonal.CAJA, RolPersonal.MESERO) 
  @ApiOperation({ summary: 'Ver la pre-cuenta de una mesa antes de cobrar' })
  async verPreCuenta(@Param('id_mesa') id_mesa: number) {
    return await this.estadisticasService.obtenerPreCuenta(id_mesa);
  }

}