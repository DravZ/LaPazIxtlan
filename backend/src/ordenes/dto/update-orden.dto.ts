import { IsArray, ValidateNested, IsOptional, IsEnum, IsString, IsInt} from 'class-validator';
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
    example: 'El cliente cambió de opinión',
    description: 'Motivo por el cual se canceló la orden',
    required: false
  })
  @IsOptional()
  @IsString()
  motivo_cancelacion?: string;

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

  @ApiProperty({
    example: 1,
    description: 'ID del mesero para reasignar o tomar la orden',
    required: false
  })
  @IsOptional()
  @IsInt()
  id_mesero?: number;
}