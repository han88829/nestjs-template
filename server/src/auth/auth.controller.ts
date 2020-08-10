import { Controller, Param, Get, Logger, Query, UnauthorizedException, Session, Request, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    login(@Body() data, @Request() req): object {

        console.log(data);

        if (!data['name'] || !data['pwd']) throw new UnauthorizedException()
        req.session.user = data;
        const token = this.authService.signToken(data);
        return {
            status: 1,
            msg: "登录成功！",
            data: token
        }
    }

    @Get()
    @UseGuards(AuthGuard())
    fetch(@Query() { token }, @Request() req): object {
        console.log(req.session.user);
        const data = this.authService.verify(token);
        return data
    }
}
