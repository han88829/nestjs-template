import { Controller, Get, Param, UseGuards, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
    @Get()
    fetch(): string {
        return "用户查询"
    }

    @Get('login')
    login(@Param() { name, pwd }): object {
        console.log(name, pwd);
        return {
            status: 1,
            msg: ""
        }
    }
}
