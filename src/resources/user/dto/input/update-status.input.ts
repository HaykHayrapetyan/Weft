import { IsEnum, IsMongoId, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Types } from "mongoose";
import { Statuses } from "../../user.types";

export class UpdateUserStatusInput {
    @IsMongoId()
    @MaxLength(25)
    @IsNotEmpty()
    readonly userId: Types.ObjectId;

    @IsString()
    @IsEnum(Statuses)
    @IsNotEmpty()
    readonly status: Statuses;
}