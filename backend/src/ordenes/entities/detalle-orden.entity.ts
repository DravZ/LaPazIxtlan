import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Orden } from './orden.entity';
import { MenuProducto } from '../../menu/entities/menu-producto.entity';
import { Topping } from '../../menu/entities/topping.entity'; 

@Entity('detalle_orden')
export class DetalleOrden {
  @PrimaryGeneratedColumn()
  id_detalle!: number;

  @Column({ type: 'int' })
  cantidad_solicitada!: number;

  @Column({ type: 'text', nullable: true })
  notas_preparacion?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  precio_unitario!: number;

  @ManyToOne(() => Orden, orden => orden.detalles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_orden' })
  orden!: Orden;

  @ManyToOne(() => MenuProducto)
  @JoinColumn({ name: 'id_producto' })
  producto!: MenuProducto;

  @ManyToMany(() => Topping)
  @JoinTable({
    name: 'detalle_orden_toppings',
    joinColumn: { name: 'id_detalle', referencedColumnName: 'id_detalle' },
    inverseJoinColumn: { name: 'id_topping', referencedColumnName: 'id_topping' },
  })
  toppings!: Topping[];
}