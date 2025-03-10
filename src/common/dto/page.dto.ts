import { ApiProperty } from '@nestjs/swagger';
import { SortDirection } from '@sksharma72000/nestjs-search-page/constants';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PageDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  public _start: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  public _end: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public _sort: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public _order: SortDirection;
}
