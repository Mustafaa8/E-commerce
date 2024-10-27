import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Cart } from 'src/typeorm/entities/Cart';
import { CreateUserParams, JwtPayload, UpdateUserParams } from 'src/utils/types';
import {JwtService} from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepo:Repository<User>,
        @InjectRepository(Cart) private cartRepo:Repository<Cart>,
        private jwtService:JwtService){};
    async hashPassword(password:string){
        const hash = await bcrypt.hash(password,10)
        return hash
    }
    async payloadExtracting(payload:Promise<JwtPayload>){
        const payloadRes = await payload
        const {userId,Admin} = payloadRes
        const user = await this.userRepo.findOne({where:{_id:new ObjectId(userId)}})
        return {user,Admin}
    }
    fetchUsers(){
        return this.userRepo.find()
    }
    getUser(userId:ObjectId){
        //const id = new ObjectId(userId)
        return this.userRepo.find({where:{_id:userId}})
    }
    async createUser(userPayload:CreateUserParams){
        const hashedPassword = await this.hashPassword(userPayload.password)
        const user = this.userRepo.create({...userPayload,password:hashedPassword})
        return this.userRepo.save(user)
    }
    updateUser(userId:ObjectId,userPayload:UpdateUserParams){
        return this.userRepo.update({_id:userId},{...userPayload})
    }
    deleteAll(){
        return this.userRepo.delete({})
    }
    deleteUser(userId:ObjectId){
        return this.userRepo.delete({_id:userId})
    }
    async getCart(payload:Promise<JwtPayload>){
        const {user,Admin} = await this.payloadExtracting(payload)
        return user.cart
    }
    
}