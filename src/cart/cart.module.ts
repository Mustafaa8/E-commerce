import { Module } from '@nestjs/common';
import { CartController } from './controllers/cart/cart.controller';
import { CartService } from './services/cart/cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/typeorm/entities/Cart';
import { User } from 'src/typeorm/entities/User';
import { Product } from 'src/typeorm/entities/Product';

@Module({
  imports:[TypeOrmModule.forFeature([User,Cart,Product])],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
