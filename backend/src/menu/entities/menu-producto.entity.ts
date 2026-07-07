import { CategoriasMenu } from 'src/categorias-menu/entities/categorias-menu.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Topping } from './topping.entity';


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

  @Column({ type: 'varchar', length: 255, nullable: true })
  imagen_url?: string;

  @Column({ type: 'boolean', default: true })
  activo!: boolean;

  @ManyToOne(() => CategoriasMenu, (categoria) => categoria.productos)
  @JoinColumn({ name: 'id_categoria' })
  categoria!: CategoriasMenu;

  @OneToMany(() => Topping, (topping) => topping.producto, {
    cascade:true,
  })
  toppings!: Topping[];
}