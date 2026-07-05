import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum RolPersonal {
  ADMIN = 'Administrador',
  MESERO = 'Mesero',
  COCINA = 'Cocina',
}

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario!: number;

  @Column({ type: 'varchar', length: 150 })
  nombre_completo!: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  username!: string; 

  @Column({ type: 'varchar', length: 255 })
  password_cifrada!: string; 

  @Column({
    type: 'enum',
    enum: RolPersonal,
  })
  rol!: RolPersonal;

  @Column({ type: 'boolean', default: true })
  activo!: boolean;
}