import { Module } from '@nestjs/common';
import { UsersController } from './controller/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Cart } from 'src/typeorm/entities/Cart';
import { Product } from 'src/typeorm/entities/Product';
import { Seller } from 'src/typeorm/entities/Seller';

@Module({
  imports:[TypeOrmModule.forFeature([User,Cart,Product,Seller])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
