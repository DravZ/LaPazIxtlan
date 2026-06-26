import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Orden } from './orden.entity';
import { MenuProducto } from '../../menu/entities/menu-producto.entity';

@Entity('detalle_orden')
export class DetalleOrden {
  @PrimaryColumn()
  id_orden!: number;

  @PrimaryColumn()
  id_producto!: number;

  @Column({ type: 'int' })
  cantidad_solicitada!: number;

  @Column({ type: 'text', nullable: true })
  notas_preparacion!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  precio_unitario!: number;

  @ManyToOne(() => Orden, orden => orden.detalles)
  @JoinColumn({ name: 'id_orden' })
  orden!: Orden;

  @ManyToOne(() => MenuProducto)
  @JoinColumn({ name: 'id_producto' })
  producto!: MenuProducto;
}