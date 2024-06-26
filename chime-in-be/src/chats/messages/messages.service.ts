import { Injectable } from '@nestjs/common';
import { ChatsRepository } from '../chats.repository';
import { CreateMessageInput } from './dto/create-message.input';
import { Message } from './entities/message.entity';
import { Types } from 'mongoose';

@Injectable()
export class MessagesService {
  constructor(private readonly chatsRepository: ChatsRepository) {}

  async createMessage({ content, chatId }: CreateMessageInput, userId: string) {
    const message: Message = {
      content,
      createdAt: new Date(),
      userId,
      _id: new Types.ObjectId(),
    };
    // findOneAndUpdate() method is used to find a document and update it in the database.
    // we are using findOneAndUpdate instead of create so that we can avoid multiple calls to the database to check the userId logics. findOneAndUpdate allows us to add the logic in a single call in the filter query.
    await this.chatsRepository.findOneAndUpdate(
      // filter query to find the chat by chatId and userId.
      {
        _id: chatId,
        // $or operator performs a logical OR operation on an array of two or more expressions.
        $or: [
          // If userId is equal to the userId of the chat, then update the chat.
          { userId },
          // If userId is in the list of userIds of the chat, then update the chat.
          {
            userIds: {
              $in: [userId],
            },
          },
        ],
      },
      // update query to push the message to the messages array of the chat.
      {
        // $push operator is used to add an element to an array.
        $push: {
          messages: message,
        },
      },
    );

    return message;
  }
}
