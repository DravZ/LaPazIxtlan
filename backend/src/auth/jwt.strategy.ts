import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'MI_CLAVE_SECRETA_SUPER_SEGURA', 
    });
  }

  async validate(payload: any) {
    return { 
      id_usuario: payload.id, 
      nombre: payload.nombre, 
      rol: payload.rol 
    };
  }
}