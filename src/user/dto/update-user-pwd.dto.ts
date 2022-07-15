import {IsNotEmpty, Length} from "class-validator";


export class UpdateUserPwdDto {

    @IsNotEmpty()
    @Length(5,10)
    password: string;

}
