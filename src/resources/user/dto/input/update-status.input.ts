import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsString, MaxLength, ValidateNested } from "class-validator";
import { Types } from "mongoose";
import { Statuses } from "../../user.types";
import { Type } from "class-transformer";

export class UpdateStatusInput {
    @IsMongoId()
    @MaxLength(25)
    @IsNotEmpty()
    readonly userId: Types.ObjectId;

    @IsString()
    @IsEnum(Statuses)
    @IsNotEmpty()
    readonly status: Statuses;
}


export class UpdateUsersStatusInput {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateStatusInput)
    statuses: UpdateStatusInput[];
}