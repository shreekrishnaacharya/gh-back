import { SortDirection } from '@sksharma72000/nestjs-search-page/constants';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PageDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  public _start: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  public _end: number;

  @IsString()
  @IsOptional()
  public _sort: string;

  @IsString()
  @IsOptional()
  public _order: SortDirection;
}
