import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// import { MenuProducto } from '../../menu/entities/menu-producto.entity'; // Ajusta la ruta cuando conectes los productos

@Entity('categorias_menu') // <-- IMPORTANTE: Este debe ser el nombre exacto de la tabla en tu base de datos
export class CategoriasMenu {
  
  @PrimaryGeneratedColumn()
  id_categoria!: number;

  @Column({ type: 'varchar', length: 100 }) // Cambia el 100 si necesitas más espacio
  nombre_categoria!: string;

  /* * RELACIÓN CON LOS PRODUCTOS 
   * Categoría con muchos productos.
   */
  // @OneToMany(() => MenuProducto, (producto) => producto.categoria)
  // productos: MenuProducto[];
}