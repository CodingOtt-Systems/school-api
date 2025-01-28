import { IsInt, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => {
    const pageValue = Number(value);
    return isNaN(pageValue) ? 1 : pageValue;
  })
  page: number = 1;

  @IsInt()
  @IsPositive()
  @Transform(({ value }) => {
    const limitValue = Number(value);
    return isNaN(limitValue) ? 12 : limitValue;
  })
  limit: number = 12;
}
