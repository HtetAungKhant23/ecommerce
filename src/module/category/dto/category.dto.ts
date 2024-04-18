import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

interface IBaseCategory {
  name: string;
  desc?: string;
}

export class CreateCategoryDto implements IBaseCategory {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  desc?: string;
}

export class UpdateCategoryDto implements IBaseCategory {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  desc: string;
}

export class AddProdDto {
  @ApiProperty({ type: 'string', isArray: true })
  @IsNotEmpty()
  @IsArray()
  productIds: string[];
}
