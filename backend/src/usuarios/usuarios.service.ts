import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll() {
    return await this.usuarioRepository.find({
      select: {
        id_usuario: true,
        nombre_completo: true,
        id_rol: true,
        activo: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.usuarioRepository.findOne({
      where: { id_usuario: id },
      select: {
        id_usuario: true,
        nombre_completo: true,
        id_rol: true,
        activo: true,
      },
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
  const { id_rol, password, ...rest } = updateUsuarioDto;

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

  if (id_rol) {
    usuario.id_rol = { id_rol: id_rol } as any; 
  }

  return await this.usuarioRepository.save(usuario);
}

  async remove(id: number) {
    await this.usuarioRepository.delete(id);
    return { message: `Usuario con ID ${id} eliminado correctamente` };
  }
}
