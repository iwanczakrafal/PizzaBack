import { PartialType } from '@nestjs/mapped-types';
import { AddProductToBasketDto } from './add-product-to-basket.dto';

export class UpdateBasketDto extends PartialType(AddProductToBasketDto) {}
