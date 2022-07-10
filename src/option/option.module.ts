import {forwardRef, Module} from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { BasketModule } from 'src/basket/basket.module';

@Module({
  imports:[
      forwardRef(() =>BasketModule)
  ],
  controllers: [OptionController],
  providers: [OptionService],
  exports: [OptionService],
})
export class OptionModule {}
