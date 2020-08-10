import { Controller, Get, Param, } from '@nestjs/common';

@Controller('user')
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
