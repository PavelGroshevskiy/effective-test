import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class HistoryActions extends Model {
  @Column
  actions: string;

  @Column
  userId: string;
}
