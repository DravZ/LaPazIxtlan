import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'El usuario debe ser texto' })
  usuario!: string;

  @IsString()
  @MinLength(4, { message: 'La contraseña es muy corta' })
  password!: string;
}