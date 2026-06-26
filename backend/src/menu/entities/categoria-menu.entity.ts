import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MenuProducto } from './menu-producto.entity';

@Entity('categorias_menu')
export class CategoriaMenu {
  @PrimaryGeneratedColumn()
  id_categoria!: number;

  @Column({ type: 'varchar', length: 50 })
  nombre_categoria!: string;

  @OneToMany(() => MenuProducto, (producto) => producto.categoria)
  productos!: MenuProducto[];
}