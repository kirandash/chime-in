import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '../common/database/abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './entities/chat.entity';

// @Injectable() decorator is used to define a class as a provider.
@Injectable()
export class ChatsRepository extends AbstractRepository<Chat> {
  protected readonly logger = new Logger(ChatsRepository.name);

  // @InjectModel() decorator is used to inject a Mongoose model.
  constructor(@InjectModel(Chat.name) chatModel: Model<Chat>) {
    // super() method is used to call the constructor of the extended class (AbstractRepository). So we can use the methods of the extended class in the ChatsRepository class.
    super(chatModel);
  }
}
