import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/guards/local-auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { Role } from './role.enum';
import { Roles } from './roles.decorator';
import { UserService } from './user.service';
import { PrestamistaService } from '../prestamista/prestamista.service';

@Controller('users')
export class UserController {

    constructor(
        private readonly authService: AuthService, 
        private readonly userService: UserService,
        private readonly prestamistaService: PrestamistaService) { }
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req) {
        return this.authService.login(req);
    }
    @Post('register')
    async register(@Body() user){
        if (user.role === Role.PRESTAMISTA){
            this.prestamistaService.create(user);
        }
        return await this.userService.create(user);
    }

    @UseGuards(LocalAuthGuard)
    @Roles(Role.ADMIN)
    @Post('/')
    async findAll() {
        return await this.authService.findAll();
    }
}