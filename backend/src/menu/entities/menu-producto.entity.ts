import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CategoriaMenu } from './categoria-menu.entity';

@Entity('menu_productos')
export class MenuProducto {
  @PrimaryGeneratedColumn()
  id_producto!: number;

  @Column({ type: 'varchar', length: 100 })
  nombre_producto!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descripcion!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio!: number;

  @Column({ type: 'boolean', default: true })
  activo!: boolean;

  @ManyToOne(() => CategoriaMenu, (categoria) => categoria.productos)
  @JoinColumn({ name: 'id_categoria' })
  categoria!: CategoriaMenu;
}