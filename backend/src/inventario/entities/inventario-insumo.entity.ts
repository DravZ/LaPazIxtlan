import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('inventario_insumos')
export class InventarioInsumo {
  @PrimaryGeneratedColumn()
  id_insumo!: number;

  @Column({ type: 'varchar' })
  nombre_insumo!: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  stock_actual!: number;

  @Column({ type: 'boolean', default: true })
  activo!: boolean;
}