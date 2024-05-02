import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ICreateProductDto } from './dto/product.dto';
import { AdminAuthGuard } from '../auth/guard/admin.guard';
import { CurrentUser } from 'src/core/decorator/current-user.decorator';
import { IUserAuth } from 'src/core/interfaces/current-user.interface';
import { IResponse } from 'src/core/interfaces/response.interface';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @Post()
  // @ApiBearerAuth()
  // @UseGuards(AdminAuthGuard)
  // @ApiBody({ type: ICreateProductDto })
  // async createProduct(
  //   @Body() payload: ICreateProductDto,
  //   @CurrentUser() admin: IUserAuth,
  // ): Promise<IResponse> {
  //   return this.productService
  //     .create(admin.id, payload)
  //     .then(
  //       (product): IResponse => ({
  //         _data: product,
  //         _metaData: {
  //           message: 'Product created successfully.',
  //           statusCode: HttpStatus.CREATED,
  //         },
  //       }),
  //     )
  //     .catch((err) => {
  //       if (err instanceof HttpException) throw err;
  //       throw new InternalServerErrorException({
  //         err: new Error(err.message),
  //         message: 'Internal server error.',
  //         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       });
  //     });
  // }
}
