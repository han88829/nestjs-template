import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { Users } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), TypeOrmModule.forFeature([Users])],
  controllers: [PhotoController],
  providers: [PhotoService],
  exports: [PhotoService]
})
export class PhotoModule { }
