import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { HelloService } from "./hello.service";
import { ConfigService } from '@nestjs/config';

@Controller('hello')
export class HelloController {
    constructor(
        private readonly HelloService: HelloService,
        private readonly config: ConfigService
    ) { }

    @Get()
    gethello(@Query() { ...query }) {
        console.log(process.env.PORT);

        return this.HelloService.getHello();
    }

    @Post(':id')
    getHello(@Param() { id }, @Body() { ...data }): string {
        return this.HelloService.postHello(id, data);
    }
}
