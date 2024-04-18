import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

import { AdminAuthGuard } from '../auth/guard/admin.guard';
import { IResponse } from 'src/core/interfaces/response.interface';
import {
  AddProdDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from './dto/category.dto';

@ApiTags('Category')
@ApiBearerAuth()
@UseGuards(AdminAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiBody({ type: CreateCategoryDto })
  async createCategory(@Body() payload: CreateCategoryDto): Promise<IResponse> {
    return this.categoryService
      .create(payload)
      .then(
        (category): IResponse => ({
          _data: category,
          _metaData: {
            message: 'Category created successfully.',
            statusCode: HttpStatus.CREATED,
          },
        }),
      )
      .catch((err) => {
        if (err instanceof HttpException) throw err;
        throw new InternalServerErrorException({
          err: new Error(err.message),
          message: 'Internal server error.',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        });
      });
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateCategoryDto })
  async update(
    @Body() payload: UpdateCategoryDto,
    @Param('id') categoryId: string,
  ): Promise<IResponse> {
    return this.categoryService
      .update({ ...payload, categoryId })
      .then(
        (category): IResponse => ({
          _data: category,
          _metaData: {
            message: 'Category updated successfully.',
            statusCode: HttpStatus.OK,
          },
        }),
      )
      .catch((err) => {
        if (err instanceof HttpException) throw err;
        throw new InternalServerErrorException({
          err: new Error(err.message),
          message: 'Internal server error.',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        });
      });
  }

  @Patch(':id/add-product')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: AddProdDto })
  async addProduct(
    @Body() payload: AddProdDto,
    @Param('id') categoryId: string,
  ): Promise<IResponse> {
    return this.categoryService
      .addProduct({ ...payload, categoryId })
      .then(
        (productAdded): IResponse => ({
          _data: productAdded,
          _metaData: {
            message: 'Product added to category successfully.',
            statusCode: HttpStatus.CREATED,
          },
        }),
      )
      .catch((err) => {
        if (err instanceof HttpException) throw err;
        throw new InternalServerErrorException({
          err: new Error(err.message),
          message: 'Internal server error.',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        });
      });
  }
}
