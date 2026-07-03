import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RolPersonal } from '../entities/usuario.entity'; 
export class CreateUsuarioDto  {
  @ApiProperty({
    example: 'Juan Mendoza',
    description: 'Nombre del usuario o empleado a registrar en el sistema'
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre completo no puede estar vacío' })
  nombre_completo!: string;

  @ApiProperty({
    example: 'juan_m',
    description: 'Nombre de usuario corto para iniciar sesión (username)'
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  username!: string;

  @ApiProperty({
    example: 'admin123',
    description: 'Contraseña de acceso (será encriptada automáticamente)'
  })
  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password!: string;

  @ApiProperty({
    example: RolPersonal.MESERO,
    enum: RolPersonal,
    description: 'Rol del empleado dentro del restaurante (Administrador, Mesero, Cocina)'
  })
  @IsEnum(RolPersonal, { message: 'El rol debe ser Administrador, Mesero o Cocina' })
  @IsNotEmpty({ message: 'Debes asignar un rol válido' })
  rol!: RolPersonal;

  @ApiProperty({
    example: true,
    description: 'Indica si el usuario tiene permitido entrar al sistema',
    required: false,
    default: true
  })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}