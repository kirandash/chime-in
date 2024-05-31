import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  private async hashPassword(password: string) {
    // 10 is the number of salt rounds. The higher the number, the more secure the hash.
    return bcrypt.hash(password, 10);
  }

  async create(createUserInput: CreateUserInput) {
    // Note: Make sure to not save the password in plain text. Use a hashing algorithm like bcrypt to hash the password before saving it to the database.
    return this.usersRepository.create({
      ...createUserInput,
      password: await this.hashPassword(createUserInput.password),
    });
  }

  async findAll() {
    // {} is used to define the filter query. In this case, we are not using any filter query. No filter query is used to return all the documents from the collection.
    return this.usersRepository.find({});
  }

  async findOne(_id: string) {
    return this.usersRepository.findOne({ _id });
  }

  async update(_id: string, updateUserInput: UpdateUserInput) {
    if (updateUserInput.password) {
      updateUserInput.password = await this.hashPassword(
        updateUserInput.password,
      );
    }
    return this.usersRepository.findOneAndUpdate(
      { _id },
      {
        $set: {
          ...updateUserInput,
        },
      },
    );
  }

  async remove(_id: string) {
    return this.usersRepository.findOneAndDelete({ _id });
  }
}
