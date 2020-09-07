import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';

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
}
