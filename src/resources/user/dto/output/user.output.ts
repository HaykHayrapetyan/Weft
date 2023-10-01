import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Statuses } from "../../user.types";
import { Expose, Transform } from "class-transformer";

export class UserOutput {
    @Expose()
    @IsString()
    @Transform(({ obj }) => obj._id)
    id: string;

    @Expose()
    @IsString()
    @MaxLength(25)
    @IsNotEmpty()
    readonly name: string;

    @Expose()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @Expose()
    @IsString()
    @IsEnum(Statuses)
    @IsNotEmpty()
    readonly status: string;
}