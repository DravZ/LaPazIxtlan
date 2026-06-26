import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { InventarioInsumo } from './inventario-insumo.entity';

@Entity('recetas')
export class Receta {
  @PrimaryColumn()
  id_producto!: number;

  @PrimaryColumn()
  id_insumo!: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  cantidad_requerida!: number;

  @Column({ type: 'varchar' })
  unidad_medida!: string;

  @ManyToOne(() => InventarioInsumo)
  @JoinColumn({ name: 'id_insumo' })
  insumo!: InventarioInsumo;
}