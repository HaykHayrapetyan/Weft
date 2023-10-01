import { IsInt, IsPositive, ValidateNested } from "class-validator";
import { Expose, Type } from "class-transformer";
import { UserOutput } from "./user.output";

export class GetAllusersOutput {
    @Expose()
    @Type(() => UserOutput)
    @ValidateNested({ each: true })
    items: UserOutput[];

    @Expose()
    @IsInt()
    @IsPositive()
    total: number;
}