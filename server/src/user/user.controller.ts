import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get()
    fetch(): string {
        return "用户查询"
    }
}
