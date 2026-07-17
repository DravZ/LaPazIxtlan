import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DetalleOrden } from './detalle-orden.entity';
import { Topping } from '../../menu/entities/topping.entity';

export enum EstadoTopping {
  SIN = 'sin',
  NORMAL = 'normal',
  EXTRA = 'extra'
}

@Entity('detalle_orden_toppings')
export class DetalleOrdenTopping {
  @PrimaryGeneratedColumn()
  id_detalle_topping!: number;

  @Column({
    type: 'enum',
    enum: EstadoTopping,
    default: EstadoTopping.NORMAL
  })
  estado!: EstadoTopping;

  @ManyToOne(() => DetalleOrden, detalle => detalle.detallesToppings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_detalle' })
  detalleOrden!: DetalleOrden;

  @ManyToOne(() => Topping)
  @JoinColumn({ name: 'id_topping' })
  topping!: Topping;
}