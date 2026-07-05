import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateMesaDto } from './create-mesa.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { EstadoMesa } from '../entities/mesa.entity';

export class UpdateMesaDto extends PartialType(CreateMesaDto) {
  @ApiProperty({ 
    example: EstadoMesa.OCUPADA, 
    enum: EstadoMesa,
    description: 'Estado actual de la mesa',
    required: false
  })
  @IsOptional()
  @IsEnum(EstadoMesa)
  estado?: EstadoMesa;
}