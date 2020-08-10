import {
    Injectable,
    NestInterceptor,
    CallHandler,
    ExecutionContext,
    Logger,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
interface Response<T> {
    data: T;
}
@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler<T>,
    ): Observable<Response<T>> {

        return next.handle().pipe(
            map(data => {
                const req = context.getArgByIndex(1).req;
                const logFormat = `
                Request original url: ${req.originalUrl}
                Method: ${req.method}
                IP: ${req.ip}
                User: ${JSON.stringify(req.user)}
                Response data: ${JSON.stringify(data)}
               `;
                Logger.log(logFormat);
                return {
                    data,
                    status: 1,
                    message: '请求成功',
                };
            }),
        );
    }
}
