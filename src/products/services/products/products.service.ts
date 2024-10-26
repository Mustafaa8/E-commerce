import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/entities/Product';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private productRepo:Repository<Product>){}
    getall(){

    }
    getByName(){

    }
    addProduct(){

    }
    updateProduct(){

    }
    deleteProduct(){
        
    }
}
