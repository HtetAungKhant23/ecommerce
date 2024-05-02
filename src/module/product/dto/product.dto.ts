import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

class IBaseProduct {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  desc?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  brand: string;
}

class IAttribute {
  name: string;
  value: string;
}

class IVariantProduct {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  variantName: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isTrackingStock: boolean;

  @ApiProperty({ required: false })
  allocatedStock?: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  public image: string;
}

export class ICreateProductDto extends IBaseProduct {}
