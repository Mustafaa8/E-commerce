import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { UpdateUserDto } from 'src/users/dto/updateUser.dto';
import { ObjectIdPipe } from 'src/users/pipes/object-id-pipe/object-id-pipe.pipe';
import { UsersService } from 'src/users/services/users/users.service';
import { ObjectId } from 'typeorm';

@Controller('users')
@UsePipes(new ValidationPipe)
export class UsersController {
    constructor(private userServices:UsersService){}
    @Get()
    getAllUsers(){
        return this.userServices.fetchUsers()
    }
    @Get(':id')
    getUserById(@Param('id',ObjectIdPipe) userId:ObjectId){
        return this.userServices.getUser(userId)
    }

    @Post()
    async createNewUser(@Body() userPayload:CreateUserDto){
        return await this.userServices.createUser(userPayload)
    }

    @Put(':id')
    async updateUserById(@Param('id',ObjectIdPipe) userId:ObjectId,@Body() userPayload:UpdateUserDto){
        return await this.userServices.updateUser(userId,userPayload)
    }
    @Delete()
    deleteUsers(){
        return this.userServices.deleteAll()
    }
    @Delete(':id')
    deleteUser(@Param('id',ObjectIdPipe) userId:ObjectId){
        return this.userServices.deleteUser(userId)
    }
}
