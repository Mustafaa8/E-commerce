import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AdminingGuard } from 'src/auth/guards/admining/admining.guard';
import { AddProductDto } from 'src/products/dtos/AddProduct.dto';
import { ProductsService } from 'src/products/services/products/products.service';
import { ObjectIdPipe } from 'src/users/pipes/object-id-pipe/object-id-pipe.pipe';
import { ObjectId } from 'typeorm';

@Controller('products')
export class ProductsController {
    constructor(private productServices:ProductsService){}
    @Get()
    getAllProducts(){
        return this.productServices.getall()
    }
    @Get(":name")
    async getProductByName(@Param('name') productName:string){
        return await this.productServices.getByName(productName)
    }
    @Post()
    @UseGuards(AdminingGuard)
    addProduct(@Body() productData:AddProductDto){
        return this.productServices.addProduct(productData)
    }
    @Put(":id")
    @UseGuards(AdminingGuard)
    updateProductById(@Param('id',ObjectIdPipe) productId:ObjectId,@Body() productData:AddProductDto){
        return this.productServices.updateProduct(productId,productData)
    }
    @Delete(':id')
    @UseGuards(AdminingGuard)
    deleteProduct(@Param('id',ObjectIdPipe) productId:ObjectId){
        return this.productServices.deleteProduct(productId)
    }

}
