import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { BadRequestException } from 'src/core/exceptions/bad-request.exception';
import {
  AddProdDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly dbService: PrismaService) {}

  async create(payload: CreateCategoryDto) {
    const categoryExist = await this.dbService.category.findFirst({
      where: { name: payload.name, isDeleted: false },
    });
    if (categoryExist) {
      throw new BadRequestException({
        message: 'Category name is already exist.',
        code: HttpStatus.BAD_REQUEST,
      });
    }
    return this.dbService.category.create({ data: payload });
  }

  async update(payload: UpdateCategoryDto & { categoryId: string }) {
    const category = await this.findCategory(payload.categoryId);
    if (!category) {
      throw new BadRequestException({
        message: 'Category not found.',
        code: HttpStatus.BAD_REQUEST,
      });
    }
    return this.dbService.category.update({
      where: { id: category.id },
      data: {
        name: payload.name,
        desc: payload.desc,
      },
    });
  }

  async addProduct(payload: AddProdDto & { categoryId: string }) {
    const category = this.findCategory(payload.categoryId);
    if (!category) {
      throw new BadRequestException({
        message: 'Category not found.',
        code: HttpStatus.BAD_REQUEST,
      });
    }
    return this.dbService.product.updateMany({
      where: {
        id: {
          in: payload.productIds,
        },
      },
      data: {
        categoryId: payload.categoryId,
      },
    });
  }

  private async findCategory(id: string) {
    return this.dbService.category.findUnique({
      where: { id, isDeleted: false },
    });
  }
}
