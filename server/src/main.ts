import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 错误处理
  app.useGlobalFilters(new HttpExceptionFilter())

  // 返回数据拦截器
  // app.useGlobalInterceptors(new TransformInterceptor())

  await app.listen(3000);

}
bootstrap();
