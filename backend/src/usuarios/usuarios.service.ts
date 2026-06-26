import { Injectable } from '@nestjs/common';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}


 async create(datosUsuarios: any) {
    const saltRounds = 10;
    
    const hashGenerado = await bcrypt.hash(datosUsuarios.password, saltRounds);

    const nuevoUsuario = this.usuarioRepository.create({
      ...datosUsuarios,
      password_cifrada: hashGenerado, 
    });

    return await this.usuarioRepository.save(nuevoUsuario);
  }

  findAll() {
    return `This action returns all usuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
