import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/typeorm/entities/Cart';
import { Product } from 'src/typeorm/entities/Product';
import { User } from 'src/typeorm/entities/User';
import { JwtPayload } from 'src/utils/types';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class CartService {
    constructor(@InjectRepository(User) private userRepo:Repository<User>,
                @InjectRepository(Product) private productRepo:Repository<Product>){}
    async payloadExtracting(payload:Promise<JwtPayload>){
        const payloadRes = await payload
        const {userId,isAdmin} = payloadRes
        const user = await this.userRepo.findOne({where:{_id:new ObjectId(userId)}})
        return {user,isAdmin}
    }
    async getUserCart(payload:Promise<JwtPayload>){
        const {user,isAdmin} = await this.payloadExtracting(payload)
        user.cart.updatingTotals()
        return user.cart
    }
    async addProductToCart(payload:Promise<JwtPayload>,productId:ObjectId,quantity:number){
        const {user,isAdmin} = await this.payloadExtracting(payload)
        const product = await this.productRepo.findOne({where:{_id:productId}})
        const quant = quantity || 1
        if (!product){
            throw new NotFoundException()
        }
        const addedItemInList = user.cart.items.find(item => item.product._id.equals(product._id))

        if(user.cart.items.length === 0 || !addedItemInList){
            const productItem = new Item(product,quant)
            user.cart.addingItems(productItem)
        } else {
            addedItemInList.quantity += quant
        }
        user.cart.updatingTotals()
        await this.userRepo.update({_id:user._id},user)
        return user.cart
    }
    async removeProductFromCart(payload:Promise<JwtPayload>,productId:ObjectId,quantity:number){
        const {user,isAdmin} = await this.payloadExtracting(payload)
        const product = await this.productRepo.findOne({where:{_id:productId}})
        const quant = quantity || 1
        if (!product){
            throw new NotFoundException("there is no product with that id")
        }
        const RemovedItem = user.cart.items.find(item => item.product._id.equals(product._id))
        if(!RemovedItem){
            throw new NotFoundException("Product Isn't in the cart")
        } else {
            if(RemovedItem.quantity <= quant){
                user.cart.removeItems(RemovedItem)
            } else {
                RemovedItem.quantity -= quant
            }
        }
        user.cart.updatingTotals()
        await this.userRepo.update({_id:user._id},user);
        return user.cart
    }
    async clearCart(payload:Promise<JwtPayload>){
        const {user,isAdmin} = await this.payloadExtracting(payload)
        user.cart.items = []
        user.cart.updatingTotals()
        await this.userRepo.update({_id:user._id},user);
        return user.cart
    }
}
