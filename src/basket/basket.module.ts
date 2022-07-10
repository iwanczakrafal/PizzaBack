import {forwardRef, Module} from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { ProductModule } from 'src/products/product.module';

@Module({
  imports:[
    forwardRef(() => ProductModule),
  ],
  controllers: [BasketController],
  providers: [BasketService],
  exports: [BasketService],
})
export class BasketModule {}
