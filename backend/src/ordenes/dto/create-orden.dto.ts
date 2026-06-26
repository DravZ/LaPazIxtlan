import { IsInt, IsString, IsArray, ValidateNested, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class DetalleOrdenDto {
  @IsInt({ message: 'El ID del producto debe ser entero' })
  @IsPositive()
  id_producto!: number;

  @IsInt()
  @IsPositive({ message: 'La cantidad debe ser mayor a cero' })
  cantidad_solicitada!: number;

  @IsString()
  @IsOptional()
  notas_preparacion?: string; 
}

export class CreateOrdenDto {
  @IsInt()
  id_mesero!: number;

  @IsString()
  @IsOptional()
  numero_mesa?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetalleOrdenDto)
  detalles!: DetalleOrdenDto[];
}