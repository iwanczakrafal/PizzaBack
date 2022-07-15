import { IsNumber, IsString } from "class-validator";

export class AddProductToBasketDto {
    @IsString()
    productId: string;

    @IsNumber()
    count: number;

    @IsString({})
    optionId: string;
}