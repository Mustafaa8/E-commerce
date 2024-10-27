import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UpdateUserDto } from 'src/users/dto/updateUser.dto';
import { ObjectIdPipe } from 'src/users/pipes/object-id-pipe/object-id-pipe.pipe';
import { UsersService } from 'src/users/services/users/users.service';
import { ObjectId } from 'typeorm';

@Controller('users')
export class UsersController {
    constructor(private userServices:UsersService){}
    @Get()
    getAllUsers(){
        return this.userServices.fetchUsers()
    }
    @Get('cart')
    @UseGuards(AuthGuard)
    async showUserCart(@Req() req:Request){
        return this.userServices.getCart(req['user'])
    }
    @Get(':id')
    @UseGuards(AuthGuard)
    getUserById(@Param('id',ObjectIdPipe) userId:ObjectId){
        return this.userServices.getUser(userId)
    }

    @Post()
    @UsePipes(new ValidationPipe)
    async createNewUser(@Body() userPayload:CreateUserDto){
        return await this.userServices.createUser(userPayload)
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe)
    async updateUserById(@Param('id',ObjectIdPipe) userId:ObjectId,@Body() userPayload:UpdateUserDto){
        return await this.userServices.updateUser(userId,userPayload)
    }
    @Delete()
    @UseGuards(AuthGuard)
    deleteUsers(){
        return this.userServices.deleteAll()
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id',ObjectIdPipe) userId:ObjectId){
        return this.userServices.deleteUser(userId)
    }
    
}
