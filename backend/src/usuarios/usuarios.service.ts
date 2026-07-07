import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}


async create(datosUsuarios: CreateUsuarioDto) {
    const saltRounds = 10;
    const hashGenerado = await bcrypt.hash(datosUsuarios.password, saltRounds);
    
    const nuevoUsuario = this.usuarioRepository.create({
  ...datosUsuarios,
  password_cifrada: hashGenerado, 
});

    return await this.usuarioRepository.save(nuevoUsuario);
  }

  async findAll() {
    return await this.usuarioRepository.find({
      select: {
        id_usuario: true,
        nombre_completo: true,
        username: true,
        rol: true,
        activo:true
      },
    });
  }

  async findOne(id: number) {
    return await this.usuarioRepository.findOne({
      where: { id_usuario: id },
      select: {
        id_usuario: true,
        nombre_completo: true,
        username: true,
        rol: true,
        activo: true,
      },
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const { password, ...rest } = updateUsuarioDto as any; 

    const usuario = await this.usuarioRepository.preload({
      id_usuario: id,
      ...rest,
    });

    if (!usuario) {
      throw new NotFoundException(`El usuario #${id} no existe`);
    }

    if (password) {
      const salt = await bcrypt.genSalt();
      usuario.password_cifrada = await bcrypt.hash(password, salt);
    }

    return await this.usuarioRepository.save(usuario);
  }

  async remove(id: number) {
    await this.usuarioRepository.delete(id);
    return { message: `Usuario con ID ${id} eliminado correctamente` };
  }
}
