import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ICreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private dbService: PrismaService) {}

  async create(creatorId: string, payload: ICreateProductDto) {}
}
