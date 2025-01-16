import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { UserType } from './user_type.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requiredRoles) {
        return true;
      }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request)
    //console.log(token)
    
    if (!token) {
      throw new UnauthorizedException('Usuário não autenticado.');
    }

    try{
      const loginPayload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET })
      
      if (!loginPayload) {
        return false;
      } 
    
      return requiredRoles.some((role) => role === loginPayload.type_user);
    
    } catch {
      throw new UnauthorizedException('Usuário não autenticado.');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
