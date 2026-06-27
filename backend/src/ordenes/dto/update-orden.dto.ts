import { IsString, IsIn, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DetalleOrdenDto } from './create-orden.dto'; 

export class UpdateOrdenDto {
  @ApiProperty({
    example: 'En proceso',
    description: 'El nuevo estado en el que se encuentra la orden',
    enum: ['Recibida', 'En proceso', 'Lista', 'Entregada', 'Pagada', 'Cancelada'],
    required: false 
  })
  @IsOptional() 
  @IsString()
  @IsIn(['Recibida', 'En proceso', 'Lista', 'Entregada', 'Pagada', 'Cancelada'], {
    message: 'El estado no es válido',
  })
  estado?: string; 

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