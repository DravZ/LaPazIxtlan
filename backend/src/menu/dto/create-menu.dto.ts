import { IsString, IsNumber, IsOptional, IsPositive, MinLength, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // ¡La importación mágica!
import { Type } from 'class-transformer';

export class CreateToppingDto {
  @ApiProperty({ example: 'Extra Queso' })
  @IsString()
  nombre!: string;

  @ApiProperty({ example: 15.50, required: false })
  @Type(() => Number)
  @IsOptional()
  precio_extra?: number;
}

export class CreateMenuDto {
  @ApiProperty({ 
    example: 'Tacos al Pastor', 
    description: 'Nombre del platillo o bebida a registrar' 
  })
  @IsString({ message: 'El nombre del producto debe ser texto' })
  @MinLength(3, { message: 'El nombre es muy corto' })
  nombre_producto!: string;

  @ApiProperty({ 
    example: 'Orden de 5 tacos con doble tortilla, piña y cilantro', 
    description: 'Detalles de los ingredientes o preparación',
    required: false 
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ 
    example: 65.50, 
    description: 'Precio final de venta al público' 
  })
  @Type(() => Number)
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio no puede ser negativo' })
  precio!: number;

  @ApiProperty({ 
    example: 2, 
    description: 'ID de la categoría a la que pertenece (Ej. 1 = Bebidas, 2 = Tacos)' 
  })
  @Type(() => Number)
  @IsNumber({}, { message: 'El ID de la categoría debe ser un número' })
  @IsPositive()
  id_categoria!: number;

  @ApiProperty({ 
    type: 'string', 
    format: 'binary', 
    description: 'Foto del platillo (JPG, PNG)', 
    required: false 
  })
  @IsOptional()
  imagen?: any;

  @ApiProperty({ 
    type: [CreateToppingDto], 
    description: 'Lista de toppings opcionales para este platillo',
    required: false 
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true }) 
  @Type(() => CreateToppingDto)   
  toppings?: CreateToppingDto[];
}