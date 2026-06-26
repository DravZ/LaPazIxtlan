import { Injectable } from '@nestjs/common';
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
      categoria: { id_categoria: createMenuDto.id_categoria }, 
    });

    return await this.productoRepository.save(nuevoProducto);
  }

  findAll() {
    return `This action returns all menu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
