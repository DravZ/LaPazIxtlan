import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { MenuProducto } from './menu-producto.entity';

@Entity('toppings')
export class Topping {
  @PrimaryGeneratedColumn()
  id_topping!: number;

  @Column({ type: 'varchar', length: 100 })
  nombre!: string; 

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  precio_extra!: number; 

  @ManyToOne(() => MenuProducto, (producto) => producto.toppings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_producto' })
  producto!: MenuProducto;
}