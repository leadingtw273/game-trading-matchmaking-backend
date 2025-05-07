import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseCode } from './core/response/enums/response-code.enum';
import { AppException } from './core/response/exceptions/app.exception';
import { ResponseMessage } from './core/response/constants/response-message.constant';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 設置 Swagger
  const config = new DocumentBuilder()
    .setTitle('API 文檔')
    .setDescription('API 描述')
    .setVersion('1.0')
    // .addTag('api')
    .addBearerAuth() // 如果使用 JWT 認證
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 'api' 是 Swagger UI 的路徑

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 類型轉換& dto 實例化
      whitelist: true, // 過濾掉 dto 中不存在的屬性
      forbidNonWhitelisted: true, // 出現 dto 中不存在的屬性，返回錯誤
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
        }));

        throw new AppException(
          ResponseCode.VALIDATION_FAILED,
          ResponseMessage[ResponseCode.VALIDATION_FAILED],
          messages,
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
