import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class PageTableDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  orderByField: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @IsBoolean()
  orderDirection?: boolean;

  @ApiProperty()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => Number(value) - 1)
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  page: number;

  @ApiProperty()
  @IsOptional()
  @Max(10)
  @IsNumber({
    maxDecimalPlaces: 0,
    allowInfinity: false,
    allowNaN: false,
  })
  size: number;
}

export class GetIdTable {
  @ApiProperty()
  @IsNumber()
  id: number;
}
export class TableDTO {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;
}
