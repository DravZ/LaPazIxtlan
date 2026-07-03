import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMesaDto {
  @ApiProperty({ 
    example: 1, 
    description: 'El número físico de la mesa en el restaurante' 
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  numero_mesa!: number;

  @ApiProperty({ 
    example: 4, 
    description: 'Cantidad de personas que caben en esta mesa' 
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  capacidad!: number;
}