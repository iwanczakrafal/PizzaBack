import {forwardRef, Module} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {BasketModule} from "../basket/basket.module";

@Module({
  imports:[
    forwardRef(()=> BasketModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService],
})
export class UserModule {}
