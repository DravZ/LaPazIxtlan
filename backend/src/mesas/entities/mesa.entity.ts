import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum EstadoMesa {
  LIBRE = 'libre',
  OCUPADA = 'ocupada',
}

@Entity('mesas')
export class Mesa {
  @PrimaryGeneratedColumn()
  id_mesa!: number;

  @Column({ type: 'int', unique: true })
  numero_mesa!: number;

  @Column({
    type: 'enum',
    enum: EstadoMesa,
    default: EstadoMesa.LIBRE,
  })
  estado!: EstadoMesa;

  @Column({ type: 'int' })
  capacidad!: number;
}