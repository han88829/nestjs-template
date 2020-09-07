import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';
import { encryptPassword } from 'src/utils/crypto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private users: Repository<Users>
    ) { }

    async find(where): Promise<Users> {
        const user = await this.users.findOne(where);
        return user
    }
    save(data) {
        if (!data.id) return this.users.insert(data);
        return this.users.update({ id: data.id }, data);
    }
    async register(data) {
        const user = await this.users.findOne({ account: data.account });
        if (user) return { status: -1, msg: "已存在的账号！" };

        data.pwd = encryptPassword(data.pwd, data.account);

        const res = await this.users.insert(data);
        const id = res.identifiers.indexOf;
        const token = encryptPassword(data.pwd, `${data.account}${id}`);

        return {
            status: 1,
            data: token,
            msg: "注册成功！"
        };
    }
}
