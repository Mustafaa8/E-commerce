import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService:JwtService
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request:Request = context.switchToHttp().getRequest()
    const token = request.headers.authorization?.split(' ')[1]
    if(!token){
      throw new UnauthorizedException()
    } 
    const payload = this.jwtService.verifyAsync(token,{secret:process.env.JWT_SECRET})
    request['user'] = payload
    return true;
  }
}
