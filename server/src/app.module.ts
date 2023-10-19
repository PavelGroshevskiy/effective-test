import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from './config/sequelizeConfigService';
import { databaseConfig } from './config/configuration';
import { UsersModule } from './users/users.module';
import { HistoryActionsModule } from './history-actions/history-actions.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),

    UsersModule,
    HistoryActionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
