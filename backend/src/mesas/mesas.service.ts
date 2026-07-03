import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mesa } from './entities/mesa.entity';

@Injectable()
export class MesasService {
  constructor(
    @InjectRepository(Mesa)
    private readonly mesaRepository: Repository<Mesa>,
  ) {}

  async create(createMesaDto: CreateMesaDto) {
    const nuevaMesa = this.mesaRepository.create(createMesaDto);
    return await this.mesaRepository.save(nuevaMesa);
  }

  async findAll() {
    return await this.mesaRepository.find({
      order: { numero_mesa: 'ASC' }
    });
  }

  async findOne(id: number) {
    const mesa = await this.mesaRepository.findOne({ where: { id_mesa: id } });
    if (!mesa) {
      throw new NotFoundException(`La mesa #${id} no existe`);
    }
    return mesa;
  }

  async update(id: number, updateMesaDto: UpdateMesaDto) {
    const mesa = await this.mesaRepository.preload({
      id_mesa: id,
      ...updateMesaDto,
    });

    if (!mesa) {
      throw new NotFoundException(`La mesa #${id} no existe`);
    }

    return await this.mesaRepository.save(mesa);
  }

  async remove(id: number) {
    const mesa = await this.findOne(id);
    await this.mesaRepository.remove(mesa);
    return { mensaje: `Mesa #${id} eliminada correctamente` };
  }
}