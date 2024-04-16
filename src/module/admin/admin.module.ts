import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { DbHelperService } from 'src/shared/helper/DbHelper.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, DbHelperService],
})
export class AdminModule {}
