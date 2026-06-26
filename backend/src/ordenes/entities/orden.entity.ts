import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { DetalleOrden } from './detalle-orden.entity';

@Entity('ordenes')
export class Orden {
  @PrimaryGeneratedColumn()
  id_orden!: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_mesero' })
  mesero!: Usuario;

  @Column({ type: 'varchar', length: 20 })
  estado!: string; // 'Recibida', 'En proceso', 'Lista', 'Entregada', 'Pagada', 'Cancelada'

  @Column({ type: 'varchar', length: 20, nullable: true })
  numero_mesa!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  motivo_cancelacion!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion!: Date;

  @OneToMany(() => DetalleOrden, detalle => detalle.orden)
  detalles!: DetalleOrden[];
}