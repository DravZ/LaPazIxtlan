import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ventas_tickets')
export class VentaTicket {
  @PrimaryGeneratedColumn()
  id_ticket!: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  total_venta!: number;

  @Column({ type: 'timestamp' })
  fecha_venta!: Date;

  @Column({ name: 'metodo_pago', type: 'varchar', length: 50, nullable: true })
metodo_pago!: string;
}