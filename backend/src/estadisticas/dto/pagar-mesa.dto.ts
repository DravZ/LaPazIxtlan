import { IsInt, IsString, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PagarMesaDto {
  @ApiProperty({ example: 1, description: 'El ID de la mesa a la que se le cobrará la cuenta' })
  @IsInt()
  @IsPositive()
  id_mesa!: number;

  @ApiProperty({ example: 'Efectivo', description: 'Método de pago (Efectivo, Tarjeta, Transferencia)' })
  @IsString()
  @IsNotEmpty()
  metodo_pago!: string;
}