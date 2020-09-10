import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { logger } from "./middleware/logger.middleware";
import * as express from 'express';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { AllExceptionsFilter } from './filter/any-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter())

  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

  // 监听所有的请求路由，并打印日志
  app.use(logger)

  // 使用全局拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor());

  // 全局错误捕获
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT);
}
bootstrap();
