import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Statuses } from "../../user.types";

export class CreateUserInput {

    @IsString()
    @MaxLength(25)
    @IsNotEmpty()
    readonly name: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsEnum(Statuses)
    @IsNotEmpty()
    readonly status: string;
}