import { IsString, IsNumber, IsOptional, IsPositive, MinLength } from 'class-validator';

export class CreateMenuDto {
  @IsString({ message: 'El nombre del producto debe ser texto' })
  @MinLength(3, { message: 'El nombre es muy corto' })
  nombre_producto!: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio no puede ser negativo' })
  precio!: number;

  @IsNumber({}, { message: 'El ID de la categoría debe ser un número' })
  @IsPositive()
  id_categoria!: number;
}