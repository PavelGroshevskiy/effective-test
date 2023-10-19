import { Controller, Get, Query } from '@nestjs/common';
import { HistoryActionsService } from './history-actions.service';
import { query } from 'express';

// В сервис “истории действий с пользователями” нужно отправлять события создания пользователя
// и изменения. Общение сервисов может происходить любым способом. Сервис “истории действий
// с пользователями” должен иметь ручку, которая отдаст историю действий с фильтрами по id
// пользователя и постраничной навигацией. Фреймворк так же может быть любой. Один из
// сервисов должен быть на JS, для второго можно использовать TS. СУБД - postgresql

@Controller('history-actions')
export class HistoryActionsController {
  constructor(private readonly historyActionsService: HistoryActionsService) {}
  @Get()
  paginateAndSort(@Query() query) {
    return this.historyActionsService.paginateAndSort(query);
  }
}
