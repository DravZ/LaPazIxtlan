import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaMenu } from './entities/categoria-menu.entity';
import { Repository } from 'typeorm';
import { MenuProducto } from './entities/menu-producto.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(CategoriaMenu)
    private readonly categriaRepsotory: Repository<CategoriaMenu>,

    @InjectRepository(MenuProducto)
    private readonly productoRepository: Repository <MenuProducto>,
  ){}

  async obtenerMenuCompleto() {
    return await this.categriaRepsotory.find({
      relations: {
        productos: true,
      },
      where: {
        productos: {
          activo: true,
        },
      },
    });
  }

  async create(createMenuDto: CreateMenuDto) {
    const nuevoProducto = this.productoRepository.create({
      nombre_producto: createMenuDto.nombre_producto,
      descripcion: createMenuDto.descripcion,
      precio: createMenuDto.precio,
      categoria: { id_categoria: createMenuDto.id_categoria } as any, 
    });

    return await this.productoRepository.save(nuevoProducto);
  }

  async findAll() {
    return await this.productoRepository.find({
      relations: {
        categoria: true, 
      },
    });
  }

  async findOne(id: number) {
    const producto = await this.productoRepository.findOne({
      where: { id_producto: id },
      relations: {
        categoria: true,
      },
    });
    
    if (!producto) {
      throw new NotFoundException(`El producto con ID ${id} no existe`);
    }
    return producto;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const producto = await this.findOne(id);
    
    const productoActualizado = Object.assign(producto, updateMenuDto);
    
    if (updateMenuDto.id_categoria) {
      productoActualizado.categoria = { id_categoria: updateMenuDto.id_categoria } as any;
    }
    return await this.productoRepository.save(productoActualizado);
  }

  async remove(id: number) {
    
    const producto = await this.findOne(id);
    return await this.productoRepository.remove(producto);
  }
}
