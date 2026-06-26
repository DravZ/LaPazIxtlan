import { IsString, IsIn } from 'class-validator';

export class UpdateOrdenDto {
  @IsString()
  @IsIn(['Recibida', 'En proceso', 'Lista', 'Entregada', 'Pagada', 'Cancelada'], {
    message: 'El estado no es válido',
  })
  estado!: string;
}