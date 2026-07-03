import { IsArray, ValidateNested, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DetalleOrdenDto } from './create-orden.dto'; 
import { EstadoOrden } from '../entities/orden.entity';

export class UpdateOrdenDto {
  @ApiProperty({
    example: EstadoOrden.EN_PREPARACION,
    description: 'El nuevo estado en el que se encuentra la orden',
    enum: EstadoOrden, 
    required: false 
  })
  @IsOptional() 
  @IsEnum(EstadoOrden, { message: 'El estado proporcionado no es válido en el flujo del sistema' })
  estado?: EstadoOrden; 

  @ApiProperty({
    type: [DetalleOrdenDto],
    description: 'Nuevos productos a agregar a la orden',
    required: false
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetalleOrdenDto)
  nuevosDetalles?: DetalleOrdenDto[];
}