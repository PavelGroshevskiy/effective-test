import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { hash } from 'bcrypt';
import { HistoryActionsService } from 'src/history-actions/history-actions.service';

@Injectable()
export class UsersService {
  id = 0;
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly historyActionsService: HistoryActionsService,
  ) {}

  findOne(filter: {
    where: { id?: string; email?: string; username?: string };
  }): Promise<User> {
    return this.userModel.findOne({ ...filter });
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<User | { warningMessage: string }> {
    const user = new User();

    const existingByUserName = await this.findOne({
      where: { username: createUserDto.username },
    });

    const existingByEmail = await this.findOne({
      where: { email: createUserDto.email },
    });

    if (existingByUserName) {
      return { warningMessage: 'Username alredy exist' };
    }
    if (existingByEmail) {
      return { warningMessage: 'Email alredy exist' };
    }

    const hashPassword = await hash(createUserDto.password, 10);

    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = hashPassword;
    user.id = this.id += 1;

    if (user.isNewRecord) {
      await this.historyActionsService.actionCreateUser(
        {
          email: user.email,
          userId: user.id,
          username: user.username,
        },
        'create',
      );
    }

    return user.save();
  }

  findAll() {
    return this.userModel.findAll();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateUser = await this.userModel.findOne({ where: { id } });
    updateUser.username = updateUserDto.username;
    updateUser.email = updateUserDto.email;

    if (updateUser) {
      await this.historyActionsService.actionCreateUser(
        {
          email: updateUser.email,
          userId: updateUser.id,
          username: updateUser.username,
        },
        'update',
      );
    }
    return updateUser.save();
  }
}
