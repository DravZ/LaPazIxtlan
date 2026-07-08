import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'juan_perez',
    description: 'El nombre de usuario único (username) registrado en el sistema'
  })
  @IsString({ message: 'El usuario debe ser texto' })
  username!: string;

  @ApiProperty({
    example: 'admin123',
    description: 'La contraseña de acceso (mínimo 4 caracteres)'
  })
  @IsString()
  @MinLength(4, { message: 'La contraseña es muy corta' })
  password!: string;
}