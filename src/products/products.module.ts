import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products/products.controller';
import { ProductsService } from './services/products/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/entities/Product';

@Module({
  imports:[TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
