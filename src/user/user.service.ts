import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async findOne(username: string): Promise<UserEntity | undefined> {
        let users = await this.userRepository.findOne({ where: { username } });
        if (!users) {
            throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND);
        }
        return users;
    }

    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async create(usuario: UserEntity):Promise<UserEntity>{
        if (usuario.password.length < 6){
            throw new BusinessLogicException("The password is too short", BusinessError.BAD_REQUEST)
        }
        let userValidation = await this.userRepository.findOne({where:{username: usuario.username}});
        if(userValidation){
            throw new BusinessLogicException("The user already exists", BusinessError.BAD_REQUEST)
        }
        let creado = this.userRepository.save(usuario);
        if (!creado){
            throw new BusinessLogicException("The user wasn't created", BusinessError.BAD_REQUEST)
        }
        return await creado;

    }

}