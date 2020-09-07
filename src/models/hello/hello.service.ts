import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
    getHello(): string {
        return "你好 hello!";
    }
    postHello(id, data: object): string {
        const str = Object.entries(data).reduce((a, b) => a += `${b[0]}:${b[1]}\n`, '');
        return `${id}\n${str}`;
    }
}
