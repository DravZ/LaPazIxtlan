import { MenuProducto } from 'src/menu/entities/menu-producto.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// import { MenuProducto } from '../../menu/entities/menu-producto.entity'; // Ajusta la ruta cuando conectes los productos

@Entity('categorias_menu') 
export class CategoriasMenu {
  
  @PrimaryGeneratedColumn()
  id_categoria!: number;

  @Column({ type: 'varchar', length: 100 }) 
  nombre_categoria!: string;

  @OneToMany(() => MenuProducto, (producto) => producto.categoria)
  productos!: MenuProducto[];
}