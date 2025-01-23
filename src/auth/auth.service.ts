import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import jwtConstants  from '../shared/security/constants';

@Injectable()
export class AuthService {
   constructor(
       private usersService: UserService,
       private jwtService: JwtService,

   ) {}

   findAll(): Promise<UserEntity[]> {
         return this.usersService.findAll();
   }

   async validateUser(username: string, password: string): Promise<any> {
       const user: UserEntity = await this.usersService.findOne(username);
       if (user && user.password === password) {
           const { password, ...result } = user;
           return result;
       }
       return null;
   }
   async login(req: any) {
    const payload = { name: req.user.username, sub: req.user.id, role: req.user.role };
    return {
        token: this.jwtService.sign(payload, { privateKey: jwtConstants.JWT_SECRET }),
        iduser: req.user.id,
    };
    }

}
