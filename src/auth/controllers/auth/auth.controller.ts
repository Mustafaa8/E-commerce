import { Controller,Get,Post,Req,Body,UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { LoginDto } from 'src/auth/dtos/login.dto';
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post('login')
    login(@Body() userData:LoginDto){
        return this.authService.loginUser(userData)
    }
    @Get('protected')
    @UseGuards(AuthGuard)
    async protected(@Req() req:Request){
        const user = (await req['user'])
        return {"msg":"You Are Here","user":user}
    }
}
