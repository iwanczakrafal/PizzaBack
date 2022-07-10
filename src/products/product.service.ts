import {forwardRef, Inject, Injectable} from '@nestjs/common';
import { BasketService } from 'src/basket/basket.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
      @Inject(forwardRef(() => BasketService)) private basketService: BasketService,
  ) {
  }
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new products';
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
