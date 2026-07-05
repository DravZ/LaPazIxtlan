import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Orden } from '../../ordenes/entities/orden.entity';

@Entity('ventas_tickets')
export class VentaTicket {
  @PrimaryGeneratedColumn()
  id_ticket!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_venta!: number;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_venta!: Date;

  @Column({ name: 'metodo_pago', type: 'varchar', length: 50, default: 'Efectivo' })
  metodo_pago!: string;

  @OneToOne(() => Orden)
  @JoinColumn({ name: 'id_orden' })
  orden!: Orden;
}