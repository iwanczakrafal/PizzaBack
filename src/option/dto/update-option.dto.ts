import {IsNumber} from "class-validator";


export class UpdateOptionDto {
    @IsNumber()
    price: number;
}
