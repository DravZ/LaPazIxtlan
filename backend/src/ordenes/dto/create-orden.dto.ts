import { IsInt, IsString, IsArray, ValidateNested, IsOptional, IsPositive, IsNotEmpty, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { EstadoTopping } from '../entities/detalle-orden-topping.entity';

export class ToppingOrdenDto {
  @ApiProperty({ 
    example: 5, 
    description: 'ID del topping o ingrediente a modificar' 
  })
  @IsInt()
  @IsPositive()
  id_topping!: number;

  @ApiProperty({ 
    example: EstadoTopping.EXTRA, 
    enum: EstadoTopping,
    description: 'Estado del ingrediente: sin, normal o extra' 
  })
  @IsEnum(EstadoTopping, { message: 'El estado debe ser sin, normal o extra' })
  @IsNotEmpty()
  estado!: EstadoTopping;
}

export class DetalleOrdenDto {
  @ApiProperty({ example: 15, description: 'ID del platillo o bebida del menú' })
  @IsInt({ message: 'El ID del producto debe ser entero' })
  @IsPositive()
  id_producto!: number;

  @ApiProperty({ example: 3, description: 'Cantidad de porciones ordenadas' })
  @IsInt()
  @IsPositive({ message: 'La cantidad debe ser mayor a cero' })
  cantidad_solicitada!: number;

  @ApiProperty({ example: 'Término medio', description: 'Instrucciones especiales para cocina', required: false })
  @IsString()
  @IsOptional()
  notas_preparacion?: string; 

  @ApiProperty({ type: [ToppingOrdenDto], description: 'Lista de ingredientes con sus estados', required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ToppingOrdenDto)
  @IsOptional()
  toppings?: ToppingOrdenDto[];
}

export class CreateOrdenDto {
  @ApiProperty({ example: 2, description: 'ID del mesero', required: false })
  @IsInt()
  @IsOptional() 
  id_mesero?: number;

  @ApiProperty({ example: 5, description: 'El ID de la mesa' })
  @IsInt()
  @IsNotEmpty()
  id_mesa!: number;

  @ApiProperty({ type: [DetalleOrdenDto], description: 'Lista de los platillos' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetalleOrdenDto)
  detalles!: DetalleOrdenDto[];
}