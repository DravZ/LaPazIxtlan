import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'Juan Mendoza',
    description: 'El nombre de usuario único registrado en el sistema'
  })
  @IsString({ message: 'El usuario debe ser texto' })
  nombre_completo!: string;

  @ApiProperty({
    example: 'admin123',
    description: 'La contraseña de acceso (mínimo 4 caracteres)'
  })
  @IsString()
  @MinLength(4, { message: 'La contraseña es muy corta' })
  password!: string;
}