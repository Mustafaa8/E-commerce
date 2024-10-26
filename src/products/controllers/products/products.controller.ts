import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AddProductDto } from 'src/products/dtos/AddProduct.dto';
import { ProductsService } from 'src/products/services/products/products.service';
import { ObjectIdPipe } from 'src/users/pipes/object-id-pipe/object-id-pipe.pipe';
import { ObjectId } from 'typeorm';

@Controller('products')
export class ProductsController {
    constructor(private productServices:ProductsService){}
    @Get()
    getAllProducts(){

    }
    @Get(":name")
    getProductByName(@Param('name') productName:string){

    }
    @Post()
    addProduct(@Body() productData:AddProductDto){

    }
    @Put(":id")
    updateProductById(@Param('id',ObjectIdPipe) productId:ObjectId,@Body() productData:AddProductDto){

    }
    @Delete(':id')
    deleteProduct(@Param('id',ObjectIdPipe) productId:ObjectId){
        
    }

}
