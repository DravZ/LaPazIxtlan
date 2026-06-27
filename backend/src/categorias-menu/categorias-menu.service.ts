import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoriasMenuDto } from './dto/create-categorias-menu.dto';
import { UpdateCategoriasMenuDto } from './dto/update-categorias-menu.dto';
import { CategoriasMenu } from './entities/categorias-menu.entity';
import { MenuProducto } from '../menu/entities/menu-producto.entity';

@Injectable()
export class CategoriasMenuService {
  constructor(
    @InjectRepository(CategoriasMenu)
    private readonly categoriaRepository: Repository<CategoriasMenu>, // <-- Asegúrate de que esta coma esté

    @InjectRepository(MenuProducto)
    private readonly productoRepository: Repository<MenuProducto> // <-- Y aquí NO debe haber coma, solo el cierre de paréntesis
  ) {}

  async create(createCategoriasMenuDto: CreateCategoriasMenuDto) {
    const nuevaCategoria = this.categoriaRepository.create(createCategoriasMenuDto);
    
    return await this.categoriaRepository.save(nuevaCategoria);
  }

  async findAll() {
    return await this.categoriaRepository.find();
  }

  async findOne(id: number) {
    const categoria = await this.categoriaRepository.findOne({
      where: { id_categoria: id }, 
    });

    if (!categoria) {
      throw new NotFoundException(`La categoría con ID ${id} no existe en el menú`);
    }

    return categoria;
  }

  async update(id: number, updateCategoriasMenuDto: UpdateCategoriasMenuDto) {
    await this.findOne(id); 

    await this.categoriaRepository.update(id, updateCategoriasMenuDto);

    return this.findOne(id);
  }

  async remove(id: number) {
  const categoriaAEliminar = await this.findOne(id);

  const cuentaProductos = await this.productoRepository.count({
    where: { categoria: { id_categoria: id } }
  });

  if (cuentaProductos > 0) {
    throw new BadRequestException(
      `No se puede eliminar la categoría #${id} porque tiene ${cuentaProductos} producto(s) asignado(s). Primero elimina o reasigna los productos.`
    );
  }
  await this.categoriaRepository.remove(categoriaAEliminar);

  return { message: `La categoría #${id} fue eliminada exitosamente del sistema` };
}
}