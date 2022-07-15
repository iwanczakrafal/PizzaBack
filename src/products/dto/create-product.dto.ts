import {IsBoolean, IsNumber, IsString, Length, Min} from "class-validator";

export class CreateProductDto {

    @IsString()
    name: string;

    @IsString()
    @Length(10,200)
    description: string ;

    @IsNumber()
    @Min(1)
    price: number;

    @IsBoolean()
    isSpecial: boolean;

}
