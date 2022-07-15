import {forwardRef, Inject, Injectable } from '@nestjs/common';
import { ProductService } from 'src/products/product.service';
import { AddProductToBasketDto } from './dto/add-product-to-basket.dto';
import {UserService} from "../user/user.service";
import {DataSource} from "typeorm";
import {ProductInBasket} from "./entities/product-in-basket.entity";
import {User} from "../user/entities/user.entity";
import {
  AddProductToBasketRes,
  ClearBasketRes,
  GetBasketStatsRes,
  GetTotalBasketPriceRes,
  RemoveProductFromBasketRes
} from "../types";
import {OptionService} from "../option/option.service";
import * as striptags from "striptags";

@Injectable()
export class BasketService {
  constructor(
      @Inject(forwardRef(() => ProductService)) private productService: ProductService,
      @Inject(forwardRef(() => UserService)) private userService: UserService,
      @Inject(forwardRef( () => OptionService)) private optionService: OptionService,
      @Inject(DataSource) private dataSource: DataSource,
  ) {
  }

  async addProductToBasket(item: AddProductToBasketDto, user: User): Promise<AddProductToBasketRes> {
    const { count, productId, optionId } = item;

    const product = await this.productService.getOneProduct(striptags(productId));
    const option = await  this.optionService.getOneOption(striptags(optionId));

      if (
          count < 1
          ||
          !product
      ) {
        return {
          isSuccess: false
        };
      }

      const basketProduct = new ProductInBasket();
      basketProduct.count = count;


      await basketProduct.save();

      basketProduct.productItem = product;
      basketProduct.user = user;
      basketProduct.option = option;

      await basketProduct.save();

      return {
        isSuccess: true,
        id: basketProduct.id
      };

  }

  async getAllBasketProductsForUser(user: User): Promise<ProductInBasket[]> {

    if (!(await this.userService.getOneUser(user.id))) {
      throw new Error("User not found");
    }

    return await this.dataSource
        .createQueryBuilder()
        .select("productsInBasket", "userProducts")
        .from(ProductInBasket, "productsInBasket")
        .leftJoinAndSelect("productsInBasket.productItem", "productItem")
        .leftJoinAndSelect("productsInBasket.option", "option")
        .where("productsInBasket.user = :user", { user: user.id })
        .getMany();
  }

  async clearBasket(user: User): Promise<ClearBasketRes> {
    try{

    await ProductInBasket.delete({
      user: {id: user.id}
    });
      return {
        isSuccess: true
      };
    }catch (err) {
      return {
        isSuccess: false
      };
    }
  }

  async removeProductFromBasket(basketProductId: string, user: User): Promise<RemoveProductFromBasketRes> {

    const product = await ProductInBasket.findOne({
      where: {
        id: basketProductId,
        user: {id: user.id}
      }
    });

    if (product) {
      await product.remove();

      return {
        isSuccess: true
      };

    } else {
      return {
        isSuccess: false
      };
    }

  }

  async getAllBasketsForAdmin(): Promise<ProductInBasket[]> {
    return ProductInBasket.find({
      relations: ["productItem", "user","option"]
    });

  }

  async getStats(): Promise<GetBasketStatsRes> {

    const { itemInBasketAvgPrice } = await this.dataSource
        .createQueryBuilder()
        .select("AVG(productItem.price)", "itemInBasketAvgPrice")
        .from(ProductInBasket, "productsInBasket")
        .leftJoinAndSelect("productsInBasket.productItem", "productItem")
        .getRawOne();

    const allProductsInBasket = await this.getAllBasketsForAdmin();

    const baskets: { [userId: string]: number; } = {};

    for (const oneProductInBasket of allProductsInBasket) {
      baskets[oneProductInBasket.user.id] = baskets[oneProductInBasket.user.id] || 0;

      baskets[oneProductInBasket.user.id] += oneProductInBasket.productItem.price * oneProductInBasket.count;
    }

    const basketsValues = Object.values(baskets);
    const basketAvgTotalPrice = basketsValues.reduce((prev, curr) => prev + curr, 0) / basketsValues.length;

    return {
      itemInBasketAvgPrice,
      basketAvgTotalPrice
    };
  }

  async totalPrice(user: User): Promise<GetTotalBasketPriceRes> {
    const basketProducts = await this.getAllBasketProductsForUser(user);

    return (await Promise.all(basketProducts.map(async item => (item.productItem.price * item.count + (item.option ? item.option.price : 0))
    )))
      .reduce((prev, curr) => prev + curr, 0);

  }

}
