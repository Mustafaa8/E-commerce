import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './typeorm/entities/User';
import { Cart } from './typeorm/entities/Cart';
import { Product } from './typeorm/entities/Product';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ConfigModule.forRoot({isGlobal:true,envFilePath:".env"}),TypeOrmModule.forRoot({
    type:'mongodb',
    url:process.env.DB_URL,
    username:process.env.MONGO_INITDB_ROOT_USERNAME,
    password:process.env.MONGO_INITDB_ROOT_PASSWORD,
    port:process.env.MONGODB_PORT as unknown as number,
    entities:[User,Cart,Product],
    synchronize:true
  }),JwtModule.register({
    global:true,
    secret:process.env.JWT_SECRET,
    signOptions:{expiresIn:'2h'}
  })  , UsersModule, ProductsModule, AuthModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
