import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';

import { HistoryActionsModule } from 'src/history-actions/history-actions.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), HistoryActionsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
