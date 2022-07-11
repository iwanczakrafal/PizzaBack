import {forwardRef, Inject, Injectable} from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import {BasketService} from "../basket/basket.service";
import {OptionItem} from "./entities/option-item.entity";

@Injectable()
export class OptionService {
  constructor(
      @Inject(forwardRef(() => BasketService)) private basketService: BasketService,
  ) {
  }
  create(createOptionDto: CreateOptionDto) {
    return 'This action adds a new option';
  }

  findAll() {
    return `This action returns all option`;
  }

  async getOneOption(id: string) {
    return await OptionItem.findOne({where: {id}}) ;
  }

  update(id: number, updateOptionDto: UpdateOptionDto) {
    return `This action updates a #${id} option`;
  }

  remove(id: number) {
    return `This action removes a #${id} option`;
  }
}
