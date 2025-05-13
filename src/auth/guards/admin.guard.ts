import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';


@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(), 
            context.getClass()
        ]);
        console.log(requiredRoles, 'requiredRoles')
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log(user, 'user')

        if (!user || !requiredRoles.includes(user.role)) {
            throw new ForbiddenException('You do not have permission (RolesGuard).');
        }
        return true;
    }
    
}