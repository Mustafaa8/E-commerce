import { Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { CartService } from 'src/cart/services/cart/cart.service';
import { ObjectIdPipe } from 'src/users/pipes/object-id-pipe/object-id-pipe.pipe';
import { ObjectId } from 'typeorm';

@Controller('cart')
export class CartController {
    constructor(private cartServices:CartService){}
    @Get()
    @UseGuards(AuthGuard)
    userCart(@Req() req:Request){
        return this.cartServices.getUserCart(req['user'])
    }
    @Post('add/:id/:quantity')
    @UseGuards(AuthGuard)
    addingItems(
        @Req() req:Request,
        @Param('id',ObjectIdPipe) productId:ObjectId,
        @Param('quantity',ParseIntPipe) quantity:number){
        return this.cartServices.addProductToCart(req['user'],productId,quantity)
    }
    @Delete('remove/:id/:quantity')
    @UseGuards(AuthGuard)
    removeItems(
        @Req() req:Request,
        @Param('id',ObjectIdPipe) productId:ObjectId,
        @Param('quantity',ParseIntPipe) quantity:number){
        return this.cartServices.removeProductFromCart(req['user'],productId,quantity)
    }
}
