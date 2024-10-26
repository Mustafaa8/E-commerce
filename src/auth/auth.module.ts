import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { AuthGuard } from './guards/auth/auth.guard';
import { AdminingGuard } from './guards/admining/admining.guard';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService,AuthGuard,AdminingGuard]
})
export class AuthModule {}
