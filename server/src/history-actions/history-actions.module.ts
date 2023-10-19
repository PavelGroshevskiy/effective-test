import { Module } from '@nestjs/common';
import { HistoryActionsService } from './history-actions.service';
import { HistoryActionsController } from './history-actions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { HistoryActions } from './history-actions.model';

@Module({
  imports: [SequelizeModule.forFeature([HistoryActions]), HistoryActionsModule],
  controllers: [HistoryActionsController],
  providers: [HistoryActionsService],
  exports: [HistoryActionsService],
})
export class HistoryActionsModule {}
