import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AdminingGuard implements CanActivate {
  constructor(private jwtService:JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req:Request = context.switchToHttp().getRequest()
    const token = req.headers['authorization']?.split(' ')[1]
    if(!token){
      throw new UnauthorizedException()
    }
    const payload = this.jwtService.verify(token,{secret:process.env.JWT_SECRET})
    if(!payload.isAdmin){
      throw new ForbiddenException()
    }
    req['payload'] = payload
    return true;
  }
}
