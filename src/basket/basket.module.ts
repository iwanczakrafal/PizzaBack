import {forwardRef, Module} from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { ProductModule } from '../products/product.module';
import {UserModule} from "../user/user.module";
import { OptionModule } from 'src/option/option.module';

@Module({
  imports:[
    forwardRef(() => ProductModule),
    forwardRef(()=> UserModule),
    forwardRef(() => OptionModule),
  ],
  controllers: [BasketController],
  providers: [BasketService],
  exports: [BasketService],
})
export class BasketModule {}
