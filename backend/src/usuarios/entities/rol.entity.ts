import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('roles')
export class Rol {
  @PrimaryGeneratedColumn()
  id_rol!: number;

  @Column({ type: 'varchar', length: 50 })
  nombre_rol!: string;

  @OneToMany(() => Usuario, (usuario) => usuario.id_rol)
  usuarios!: Usuario[];
}