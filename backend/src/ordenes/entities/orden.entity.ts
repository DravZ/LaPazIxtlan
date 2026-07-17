import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Mesa } from '../../mesas/entities/mesa.entity';
import { DetalleOrden } from './detalle-orden.entity';
import { VentaTicket } from '../../estadisticas/entities/venta-ticket.entity';


export enum EstadoOrden {
  PENDIENTE = 'Pendiente',
  EN_PREPARACION = 'En Preparación',
  LISTA = 'Lista',
  ENTREGADA = 'Entregada',
  DESCARTADA = 'Descartada',
}

@Entity('ordenes')
export class Orden {
  @PrimaryGeneratedColumn()
  id_orden!: number;

  @Column({
    type: 'enum',
    enum: EstadoOrden,
    default: EstadoOrden.PENDIENTE,
  })
  estado!: EstadoOrden;

  @ManyToOne(() => Mesa)
  @JoinColumn({ name: 'id_mesa' })
  mesa!: Mesa;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'id_mesero' })
  mesero?: Usuario;

  @ManyToOne(() => VentaTicket, ticket => ticket.ordenes, { nullable: true })
  @JoinColumn({ name: 'id_ticket' })
  ticket?: VentaTicket;

  @Column({ type: 'varchar', length: 255, nullable: true })
  motivo_cancelacion?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total!: number;


  @CreateDateColumn({ type: 'timestamp' })
  hora_creacion!: Date;

  @Column({ type: 'timestamp', nullable: true })
  hora_confirmacion?: Date;

  @Column({ type: 'timestamp', nullable: true })
  hora_lista?: Date;

  @Column({ type: 'timestamp', nullable: true })
  hora_entregada?: Date;

  @OneToMany(() => DetalleOrden, detalle => detalle.orden, { cascade: true })
  detalles!: DetalleOrden[];
}