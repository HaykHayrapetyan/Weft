import { Expose, Type } from "class-transformer";
import { UserOutput } from "./user.output";
import { IsInt, IsPositive, ValidateNested } from "class-validator";

export class UpdateUsersStatusOutput {
    @Expose()
    @Type(() => UserOutput)
    @ValidateNested({ each: true })
    items: UserOutput[];

    @Expose()
    @IsInt()
    @IsPositive()
    total: number;
}