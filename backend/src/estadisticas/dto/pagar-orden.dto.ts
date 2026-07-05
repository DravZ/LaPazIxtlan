import { IsInt, IsString, IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PagarOrdenDto {
  @ApiProperty({ example: 15, description: 'El ID de la orden que se va a cobrar' })
  @IsInt({ message: 'El ID de la orden debe ser un número entero' })
  @IsNotEmpty()
  id_orden!: number;

  @ApiProperty({ 
    example: 'Tarjeta', 
    description: 'El método con el que el cliente pagó',
    enum: ['Efectivo', 'Tarjeta', 'Transferencia']
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['Efectivo', 'Tarjeta', 'Transferencia'], { message: 'Método de pago no válido' })
  metodo_pago!: string;
}