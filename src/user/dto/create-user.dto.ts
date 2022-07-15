import { IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(5,10)
    password: string;
}