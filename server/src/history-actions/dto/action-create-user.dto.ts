import { IsNotEmpty } from 'class-validator';

export class ActionCreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly userId: string;
}
