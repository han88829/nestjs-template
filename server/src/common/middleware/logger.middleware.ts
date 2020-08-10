import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        const logFormat = `url: ${req.originalUrl}, Method: ${req.method}, IP: ${req.ip}`;
        Logger.log(logFormat);
        next();
    }
}