import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class PaginationInput {
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    limit: number;

    @Type(() => Number)
    @IsInt()
    @IsOptional()
    skip: number;
}