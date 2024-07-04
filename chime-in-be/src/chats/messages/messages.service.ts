import { Inject, Injectable } from '@nestjs/common';
import { ChatsRepository } from '../chats.repository';
import { CreateMessageInput } from './dto/create-message.input';
import { Message } from './entities/message.entity';
import { Types } from 'mongoose';
import { PUB_SUB } from '../../common/constants/injection-tokens';
import { PubSub } from 'graphql-subscriptions';
import { MESSAGE_CREATED } from './constants/pubsub-triggers';
import { MessageCreatedArgs } from './dto/message-created.args';
import { ChatsService } from '../chats.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly chatsRepository: ChatsRepository,
    private readonly chatsService: ChatsService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  async createMessage({ content, chatId }: CreateMessageInput, userId: string) {
    const message: Message = {
      content,
      createdAt: new Date(),
      userId,
      chatId,
      _id: new Types.ObjectId(),
    };
    // findOneAndUpdate() method is used to find a document and update it in the database.
    // we are using findOneAndUpdate instead of create so that we can avoid multiple calls to the database to check the userId logics. findOneAndUpdate allows us to add the logic in a single call in the filter query.
    await this.chatsRepository.findOneAndUpdate(
      // filter query to find the chat by chatId and userId.
      {
        _id: chatId,
        ...this.chatsService.userChatFilter(userId),
      },
      // update query to push the message to the messages array of the chat.
      {
        // $push operator is used to add an element to an array.
        $push: {
          messages: message,
        },
      },
    );

    // publish the message to the chatId channel
    // the name should match the name of the subscription i.e. messageCreated
    await this.pubSub.publish(MESSAGE_CREATED, { messageCreated: message });

    return message;
  }

  async getMessages(chatId: string, userId: string) {
    return (
      await this.chatsRepository.findOne({
        _id: chatId,
        // to check if user is allowed to access the chat
        ...this.chatsService.userChatFilter(userId),
      })
    ).messages;
  }

  async messageCreated({ chatId }: MessageCreatedArgs, userId: string) {
    await this.chatsRepository.findOne({
      _id: chatId,
      ...this.chatsService.userChatFilter(userId),
    });
    // MESSAGE_CREATED is the trigger that will be used to notify the client
    return this.pubSub.asyncIterator(MESSAGE_CREATED);
  }
}
