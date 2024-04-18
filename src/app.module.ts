import { Module } from '@nestjs/common';
import { PrismaModule } from './module/prisma/prisma.module';
import { AuthModule } from './module/auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { BadRequestExceptionFilter } from './core/filters/bad-request-exception.filter';
import { AppController } from './app.controller';
import { AdminModule } from './module/admin/admin.module';
import { CategoryModule } from './module/category/category.module';

@Module({
  imports: [PrismaModule, AuthModule, AdminModule, CategoryModule],
  controllers: [AppController],
  providers: [{ provide: APP_FILTER, useClass: BadRequestExceptionFilter }],
})
export class AppModule {}
