import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import jwtConstants from '../shared/security/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.JWT_SECRET,
    });
    console.log(ExtractJwt.fromAuthHeaderAsBearerToken());
  }
  

  async validate(payload: any) {
    console.log('payload:', payload);
    return { id: payload.sub, username: payload.name, roles: payload.roles };
  }
}
