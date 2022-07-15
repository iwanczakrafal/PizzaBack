import {forwardRef, Inject, Injectable} from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import {BasketService} from "../basket/basket.service";
import {OptionItem} from "./entities/option-item.entity";
import * as striptags from "striptags";
import {UpdateOptionRes} from "../types";
import {DataSource} from "typeorm";

@Injectable()
export class OptionService {
  constructor(
      @Inject(forwardRef(() => BasketService)) private basketService: BasketService,
      @Inject(DataSource) private dataSource: DataSource
  ) {
  }
  async createOption(req: CreateOptionDto): Promise<OptionItem> {

    try{
      const newOption = new OptionItem();
      newOption.name = striptags(req.name);
      newOption.price = req.price;

      await newOption.save();

      return newOption;

    }catch (err) {
      throw err
    }
  }

  async getAllOptions(): Promise<OptionItem[]> {
    return await OptionItem.find();
  }

  async getOneOption(id: string) {
    return await OptionItem.findOne({where: {id}}) ;
  }

  async changeOptionPrice(id: string, body: UpdateOptionDto): Promise<UpdateOptionRes> {
    try {
      if (body.price) {
        await this.dataSource
            .createQueryBuilder()
            .update(OptionItem)
            .set({
              price: body.price
            })
            .where("id = :id", { id })
            .execute();
      }
      return {
        message: "Option price has been updated",
        isSuccess: true,

      }
    } catch (e) {

      return {
        message: 'Ups something went wrong. Option price has not been updated.',
        isSuccess: false
      }
    }
  }

  async removeOption(id: string) {
    return await OptionItem.delete(id);
  }
}
