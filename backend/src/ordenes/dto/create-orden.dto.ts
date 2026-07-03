import { IsInt, IsString, IsArray, ValidateNested, IsOptional, IsPositive, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DetalleOrdenDto {
  @ApiProperty({ 
    example: 15, 
    description: 'ID del platillo o bebida del menú' 
  })
  @IsInt({ message: 'El ID del producto debe ser entero' })
  @IsPositive()
  id_producto!: number;

  @ApiProperty({ 
    example: 3, 
    description: 'Cantidad de porciones ordenadas' 
  })
  @IsInt()
  @IsPositive({ message: 'La cantidad debe ser mayor a cero' })
  cantidad_solicitada!: number;

  @ApiProperty({ 
    example: 'Sin cebolla y con la carne término medio', 
    description: 'Instrucciones especiales para cocina',
    required: false
  })
  @IsString()
  @IsOptional()
  notas_preparacion?: string; 
}

export class CreateOrdenDto {
  @ApiProperty({ 
    example: 2, 
    description: 'ID del mesero que está tomando la orden en la app',
    required: false 
  })
  @IsInt()
  @IsOptional() 
  id_mesero?: number;

  @ApiProperty({ 
    example: 5, 
    description: 'El ID de la mesa que hace el pedido' 
  })
  @IsInt()
  @IsNotEmpty()
  id_mesa!: number;

  @ApiProperty({ 
    type: [DetalleOrdenDto], 
    description: 'Lista de los platillos que componen el ticket' 
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetalleOrdenDto)
  detalles!: DetalleOrdenDto[];
}