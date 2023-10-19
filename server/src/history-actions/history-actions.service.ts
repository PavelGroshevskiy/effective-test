import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HistoryActions } from './history-actions.model';
import { ActionCreateUserDto } from './dto/action-create-user.dto';

// В сервис “истории действий с пользователями” нужно отправлять события создания пользователя
// и изменения. Общение сервисов может происходить любым способом. Сервис “истории действий
// с пользователями” должен иметь ручку, которая отдаст историю действий с фильтрами по id
// пользователя и постраничной навигацией. Фреймворк так же может быть любой. Один из
// сервисов должен быть на JS, для второго можно использовать TS. СУБД - postgresql

export interface PaginateActionQuery {
  limit?: string;
  offset?: number;
}

@Injectable()
export class HistoryActionsService {
  constructor(
    @InjectModel(HistoryActions)
    private historyActionsNodel: typeof HistoryActions,
  ) {}

  async actionCreateUser(
    { username, email, userId }: ActionCreateUserDto,
    createOrUpdateAction: string,
  ) {
    const action = new HistoryActions();
    const createdUser = `User ${username} ${createOrUpdateAction} with email ${email}`;
    action.userId = userId;
    action.actions = createdUser;
    console.log(createOrUpdateAction);
    return action.save();
  }

  async paginateAndSort(@Query() query: PaginateActionQuery) {
    const limit = +query.limit;
    const offset = +query.offset * 20;

    // this.historyActionsNodel.

    const compareOjectSort = (propertyName: string) => {
      return function (obj1: Object, obj2: Object) {
        const value1 = obj1[propertyName];
        const value2 = obj2[propertyName];
        if (value1 < value2) {
          return -1;
        } else if (value1 > value2) {
          return 1;
        } else {
          return 0;
        }
      };
    };

    return await this.historyActionsNodel
      .findAndCountAll({
        limit,
        offset,
      })
      .then((res) => {
        return res.rows.sort(compareOjectSort('userId'));
      });
  }
}
