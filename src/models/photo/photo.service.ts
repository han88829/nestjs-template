import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { Users } from '../user/user.entity';

@Injectable()
export class PhotoService {
    constructor(
        @InjectRepository(Photo)
        private photo: Repository<Photo>,
        @InjectRepository(Users)
        private users: Repository<Users>,
    ) { }

    async save(data) {
        const user = await this.users.findOne({ id: data.userId });
        console.log(data.userId);

        if (!data.id) return await this.photo.insert(data);
        return await this.photo.update({ id: data.id }, data);
    }
}
