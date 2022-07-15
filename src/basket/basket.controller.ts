import {Controller, Get, Post, Body, Param, Delete, Inject, UseGuards} from '@nestjs/common';
import { BasketService } from './basket.service';
import { AddProductToBasketDto } from './dto/add-product-to-basket.dto';
import {
  AddProductToBasketRes, ClearBasketRes,
  GetBasketStatsRes,
  GetTotalBasketPriceRes,
  ProductsFromBasketRes,
  RemoveProductFromBasketRes
} from "../types";
import {UserObj} from "../decorators/user-obj.decorator";
import {User} from "../user/entities/user.entity";
import { AuthGuard } from '@nestjs/passport';

@Controller('basket')
export class BasketController {
  constructor(
      @Inject(BasketService) private basketService: BasketService
  ) {}

  @Get("/")
  @UseGuards(AuthGuard('jwt'))
  getAllBasketProductsForUser(
      @UserObj() user: User
  ): Promise<ProductsFromBasketRes> {
    return this.basketService.getAllBasketProductsForUser(user);
  }
  @Get("/admin")
  @UseGuards(AuthGuard('jwtAdmin'))
  getBasketsForAdmin(): Promise<ProductsFromBasketRes> {
    return this.basketService.getAllBasketsForAdmin();
  }

  @Get("/stats")
  @UseGuards(AuthGuard('jwtAdmin'))
  getStats(): Promise<GetBasketStatsRes> {
    return this.basketService.getStats();
  }

  @Get("/total-price")
  @UseGuards(AuthGuard('jwt'))
  getTotalPrice(
      @UserObj() user: User,
  ): Promise<GetTotalBasketPriceRes> {
    return this.basketService.totalPrice(user);
  }

  @Post("/")
  @UseGuards(AuthGuard('jwt'))
  addProductToBasket(
      @Body() item: AddProductToBasketDto,
      @UserObj() user: User,
  ): Promise<AddProductToBasketRes> {

    return this.basketService.addProductToBasket(item, user);
  }

  @Delete("/all")
  @UseGuards(AuthGuard('jwt'))
  clearBasket(
      @UserObj() user: User,
  ): Promise<ClearBasketRes> {
    return this.basketService.clearBasket(user);
  }

  @Delete("/:basketProductId")
  @UseGuards(AuthGuard('jwt'))
  removeProductFromBasket(
    @Param("basketProductId") basketProductId: string,
    @UserObj() user: User,
  ): Promise<RemoveProductFromBasketRes> {
    return this.basketService.removeProductFromBasket(basketProductId, user);
  }
}
