import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(private reflector: Reflector) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Extrae los roles requeridos del decorador `@Roles`
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!requiredRoles) {
            return true; // Si no se especifican roles, permite el acceso
        }

        // Verifica el usuario desde la solicitud
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            throw new UnauthorizedException('Usuario no autenticado');
        }

        // Verifica si el usuario tiene al menos uno de los roles requeridos
        return requiredRoles.some((role) => user.roles?.includes(role));
    }
}
