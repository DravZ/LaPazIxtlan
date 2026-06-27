import { IsString, IsNumber, IsOptional, IsPositive, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // ¡La importación mágica!

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
    required: false // Le avisa a Swagger que este campo es opcional
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ 
    example: 65.50, 
    description: 'Precio final de venta al público' 
  })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio no puede ser negativo' })
  precio!: number;

  @ApiProperty({ 
    example: 2, 
    description: 'ID de la categoría a la que pertenece (Ej. 1 = Bebidas, 2 = Tacos)' 
  })
  @IsNumber({}, { message: 'El ID de la categoría debe ser un número' })
  @IsPositive()
  id_categoria!: number;
}