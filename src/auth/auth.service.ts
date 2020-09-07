import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UserService } from "../models/user/user.service";
import { JwtService } from '@nestjs/jwt';
import { ModuleRef } from '@nestjs/core';
import { encryptPassword } from 'src/utils/crypto';

@Injectable()
export class AuthService {
    private UserService: UserService;
    constructor(
        private readonly moduleRef: ModuleRef,
        private readonly jwtService: JwtService
    ) { }

    public onModuleInit() {
        // ModuleRef有一个get()方法，允许检索当前模块中可用的提供程序。此外，您可以切换到非严格模式，这样您就可以在整个应用程序中选择任何现有的提供程序。
        this.UserService = this.moduleRef.get(UserService, { strict: false });
    }

    async validateUser(account: string, pwd: string): Promise<any> {
        const user = await this.UserService.find({ account });
        if (!user) return { status: -1, msg: "未查询到用户信息！" };

        const _pwd = encryptPassword(pwd, user.account);
        if (user && user.pwd === _pwd) {
            return { status: 1, data: this.login(user) };
        }
        return { status: -1, msg: "密码错误！" };
    }
    async validatePwd(account: string, token: string): Promise<any> {

        const user = await this.UserService.find({ account });
        const _token = encryptPassword(user.pwd, `${user.account}${user.id}`);
        if (user && token === _token) {
            return user;
        }
        return null;
    }

    login(user: any) {
        const payload = { account: user.account, token: encryptPassword(user.pwd, `${user.account}${user.id}`) };
        return this.jwtService.sign(payload)
    }
}
