import { Controller, Get, Query, Post, Body, UseGuards, Inject, forwardRef, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../auth/auth.service';
import { ModuleRef } from '@nestjs/core';

@Controller('user')
export class UserController {
    // 处理循环引用1
    private auth: AuthService;
    constructor(
        // 处理循环引用2
        private readonly moduleRef: ModuleRef,
        private readonly users: UserService,
    ) { }

    // 处理循环引用3
    public onModuleInit() {
        // ModuleRef有一个get()方法，允许检索当前模块中可用的提供程序。此外，您可以切换到非严格模式，这样您就可以在整个应用程序中选择任何现有的提供程序。
        this.auth = this.moduleRef.get(AuthService, { strict: false });
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async find(@Query() { id }, @Request() req) {
        const user = req.user;
        return {
            data: await this.users.find(id),
            status: 1,
        };
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    save(@Body() { ...data }) {
        return this.users.save(data);
    }

    @Post('login')
    async login(@Body() { account, pwd }) {
        const user = await this.auth.validateUser(account, pwd);
        return user;
    }

    @Post('register')
    async register(@Body() { ...data }) {
        const res = await this.users.register(data);
        return res
    }

}
