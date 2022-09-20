import {forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {BasketService} from "../basket/basket.service";
import { DataSource } from 'typeorm';
import {User} from "./entities/user.entity";
import {DeleteAccountRes, RegisterUserRes, UpdateUserPwdRes, UserInfoForAdminRes} from "../types";
import * as striptags from 'striptags';
import { hashPassword } from '../utils/hash-password';
import {UpdateUserPwdDto} from "./dto/update-user-pwd.dto";


@Injectable()
export class UserService {
  constructor(
      @Inject(forwardRef(() => BasketService)) private basketService: BasketService,
      @Inject(DataSource) private dataSource: DataSource
  ) {
  }

  filter(user: User): RegisterUserRes {
    const { id, name, lastName, email } = user;
    return { id, name, lastName, email };
  }


  async createAccount(newUser: CreateUserDto): Promise<RegisterUserRes> {
    if ((await this.getAllUsers()).some(user => user.email === newUser.email)) {
      throw new Error("This email is already in use");
    }
    try {
      const user = new User();
      user.name = striptags(newUser.name);
      user.lastName = striptags(newUser.lastName);
      user.email = striptags(newUser.email);
      user.passwordHash = hashPassword(striptags(newUser.password));
      await user.save();

      return this.filter(user);

    } catch (err) {
      throw err;
    }

  }

  async getAllUsers(): Promise<UserInfoForAdminRes[]> {

    return (await User.find()).map(user => this.filter(user));
  }

  async getOneUser(id: string): Promise<UserInfoForAdminRes> {

    return this.filter(await User.findOneOrFail({ where: { id } }));
  }

  async updateAccountPwd(user: User, body: UpdateUserPwdDto): Promise<UpdateUserPwdRes> {
    const { id } = await this.getOneUser(user.id);
    try {
      if (body.password) {
        await this.dataSource
            .createQueryBuilder()
            .update(User)
            .set({
              passwordHash: hashPassword(striptags(body.password))
            })
            .where("id = :id", { id })
            .execute();
      }
      return {
        message: 'Your password has been updated.',
        isSuccess: true
      }
    } catch (e) {

     return {
       message: 'Ups something went wrong. Your password has not been updated.',
       isSuccess: false
     }
    }
  }

  async deleteAccount(user: User): Promise<DeleteAccountRes> {
    const userProductsInBasket = await this.basketService.getAllBasketProductsForUser(user);
    try {

      for (const productInBasket of userProductsInBasket) {
        await productInBasket.remove();
      }
      await User.delete({ id: user.id });

      return {
        isSuccess: true,
        message: `${user.name} your account has been deleted`
      };

    } catch (e) {
      return {
        isSuccess: false,
        message: `Upss ${user.name} something went wrong. Please try again`
      };
    }

  }

}
