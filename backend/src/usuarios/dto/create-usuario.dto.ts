import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto  {
  @ApiProperty({
    example: 'Juan Mendoza',
    description: 'Nombre del usuario o empleado a registrar en el sistema'
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre completo no puede estar vacío' })
  nombre_completo!: string;

  @ApiProperty({
    example: 'admin123',
    description: 'Contraseña de acceso (será encriptada automáticamente)'
  })
  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password!: string;

  @ApiProperty({
    example: 1,
    description: 'ID del rol asignado (Ej. 1 = Admin, 2 = Cajero, 3 = Mesero)'
  })
  @IsNumber()
  @IsNotEmpty({ message: 'Debes asignar un id_rol válido' })
  id_rol!: number;

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