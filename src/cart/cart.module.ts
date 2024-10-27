import { Module } from '@nestjs/common';
import { CartController } from './controllers/cart/cart.controller';
import { CartService } from './services/cart/cart.service';

@Module({
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
