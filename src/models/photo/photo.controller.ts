import { Controller, Post, Body } from '@nestjs/common';
import { PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
    constructor(
        private readonly photo: PhotoService
    ) { }

    @Post()
    async save(@Body() { ...data }) {
        const res = this.photo.save(data);
        return {
            status: 1,
            data: res
        }

    }
}
