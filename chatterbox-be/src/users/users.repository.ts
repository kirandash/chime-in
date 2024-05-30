import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '../common/database/abstract.repository';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// @Injectable() decorator is used to define a class as a provider.
@Injectable()
export class UsersRepository extends AbstractRepository<User> {
  protected readonly logger = new Logger(UsersRepository.name);

  // @InjectModel() decorator is used to inject a Mongoose model.
  constructor(@InjectModel(User.name) userModel: Model<User>) {
    // super() method is used to call the constructor of the extended class (AbstractRepository). So we can use the methods of the extended class in the UsersRepository class.
    super(userModel);
  }
}
