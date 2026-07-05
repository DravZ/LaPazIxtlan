import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const usuario = await this.usuarioRepository.findOne({
      where: { nombre_completo: loginDto.nombre_completo },
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const isValid = await bcrypt.compare(loginDto.password, usuario.password_cifrada);

    if (!isValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = {
      id: usuario.id_usuario,
      nombre: usuario.nombre_completo,
      rol: usuario.rol
    };

    return {
      mensaje: '¡Bienvenido a La Paz Ixtlán!',
      token: this.jwtService.sign(payload), 
    };
  }

  async validarUsuario(nombre_completo: string, passwordPlana: string) {
  
    const usuario = await this.usuarioRepository.findOne({ where: { nombre_completo } });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const lasContrasenasCoinciden = await bcrypt.compare(passwordPlana, usuario.password_cifrada);

    if (!lasContrasenasCoinciden) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const { password_cifrada, ...resultado } = usuario;
    return resultado;
  }
}