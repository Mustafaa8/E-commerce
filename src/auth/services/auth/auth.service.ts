import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { LoginParams } from 'src/utils/types';
@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepo:Repository<User>,
                private jwtService:JwtService){}
    async ValidatePassword(password:string,user:User){
        const userPass = user.password
        return await bcrypt.compare(password,userPass)
    }
    async loginUser(loginData:LoginParams){
        const user = await this.userRepo.findOne({
        where:{
            email:loginData.email
        }})
        if(!user){
            return new HttpException('Wrong Credentials',HttpStatus.BAD_REQUEST)
        }
        const isValidPass = this.ValidatePassword(loginData.password,user)
        if(!isValidPass){
            return new HttpException('Wrong Credentials',HttpStatus.BAD_REQUEST)
        }
        const payload = {userId : user._id , isAdmin:user.isAdmin}
        return {
            accessToken : await this.jwtService.signAsync(payload)
        }
    }
}
