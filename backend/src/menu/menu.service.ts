import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuProducto } from './entities/menu-producto.entity';
import { CategoriasMenu } from 'src/categorias-menu/entities/categorias-menu.entity';
import { Topping } from './entities/topping.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(CategoriasMenu)
    private readonly categoriaRepsotory: Repository<CategoriasMenu>,

    @InjectRepository(MenuProducto)
    private readonly productoRepository: Repository <MenuProducto>,

    @InjectRepository(Topping) 
    private readonly toppingRepository: Repository<Topping>,
  ){}

  async obtenerMenuCompleto() {
    return await this.categoriaRepsotory.find({
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

  async create(createMenuDto: CreateMenuDto, imagenUrl?: string) {
    const nuevoProducto = this.productoRepository.create({
      ...createMenuDto,
      imagen_url: imagenUrl,
      categoria: { id_categoria: createMenuDto.id_categoria },
    });

    return await this.productoRepository.save(nuevoProducto);
  }

  async findAll() {
    return await this.productoRepository.find({
      relations: {
        categoria: true, 
        toppings: true,
      },
    });
  }

  async findOne(id: number) {
    const producto = await this.productoRepository.findOne({
      where: { id_producto: id },
      relations: {
        categoria: true,
        toppings: true,
      },
    });
    
    if (!producto) {
      throw new NotFoundException(`El producto con ID ${id} no existe`);
    }
    return producto;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const productoPreCargado = await this.productoRepository.preload({
      id_producto: id,
      ...updateMenuDto,
      ...(updateMenuDto.id_categoria && { categoria: { id_categoria: updateMenuDto.id_categoria } }),
    });

    if (!productoPreCargado) {
      throw new NotFoundException(`El producto con ID ${id} no existe`);
    }

    return await this.productoRepository.save(productoPreCargado);
  }

  async remove(id: number) {
    
    const producto = await this.findOne(id);
    return await this.productoRepository.remove(producto);
  }

  async obtenerTodosLosToppings() {
    return await this.toppingRepository.find();
  }
}
