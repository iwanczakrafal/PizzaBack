import {forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {BasketService} from "../basket/basket.service";
import { DataSource } from 'typeorm';
import {User} from "./entities/user.entity";
import {DeleteAccountRes, RegisterUserRes, UserInfoForAdminRes} from "../types";
import * as striptags from 'striptags';
import { hashPassword } from '../utils/hash-pasword';

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
}
