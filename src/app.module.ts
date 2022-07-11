import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { BasketModule } from './basket/basket.module';
import { OptionModule } from './option/option.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nest_pizza',
    entities: ['dist/**/**.entity{.ts,.js}'],
    bigNumberStrings: false,
    logging: true,
    synchronize: true,
  }),
    ProductModule,
    BasketModule,
    OptionModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
