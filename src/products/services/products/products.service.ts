import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/entities/Product';
import { ProductDataParams } from 'src/utils/types';
import { ILike, Like, ObjectId, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private productRepo:Repository<Product>){}
    async getall(){
        return await this.productRepo.find()
    }
    getByName(productName:string){
        return this.productRepo.find({
            where:{name: productName},
        })
    }
    async addProduct(productData:ProductDataParams){
        const product = await this.productRepo.create(productData)
        return await this.productRepo.save(product)
    }
    async updateProduct(id:ObjectId,productData:ProductDataParams){
        const product = await this.productRepo.update({_id:id},productData)
        if(!product){
            throw new NotFoundException()
        }
        return product
    }
    async deleteProduct(id:ObjectId){
        return await this.productRepo.delete({_id:id})
    }
}
