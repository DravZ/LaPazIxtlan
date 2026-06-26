import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre completo no puede estar vacío' })
  nombre_completo!: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password!: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Debes asignar un id_rol válido' })
  id_rol!: number;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}