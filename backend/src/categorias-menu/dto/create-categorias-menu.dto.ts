import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriasMenuDto {
  @ApiProperty({ 
    example: 'Platos Fuertes', 
    description: 'El nombre de la categoría del menú' 
  })
  @IsString()
  nombre_categoria!: string;
}