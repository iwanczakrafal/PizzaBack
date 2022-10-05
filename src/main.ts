import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
      new ValidationPipe({
        disableErrorMessages: true,

        whitelist: true,
        forbidNonWhitelisted: true,

        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
          // skipMissingProperties: true,
      }),
  );
  app.enableCors({
      origin: "http://localhost:3000",
      methods: ["POST", "GET", "DELETE", "PATCH", "PUT"],
      credentials: true,
      optionsSuccessStatus: 200,
  });
  app.use(cookieParser());
  await app.listen(3001);
}
bootstrap();
