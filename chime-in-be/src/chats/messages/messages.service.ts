import { Inject, Injectable } from '@nestjs/common';
import { ChatsRepository } from '../chats.repository';
import { CreateMessageInput } from './dto/create-message.input';
import { Types } from 'mongoose';
import { PUB_SUB } from '../../common/constants/injection-tokens';
import { PubSub } from 'graphql-subscriptions';
import { MESSAGE_CREATED } from './constants/pubsub-triggers';
import { MessageDocument } from './entities/message.document';
import { Message } from './entities/message.entity';
import { UsersService } from '../../users/users.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly chatsRepository: ChatsRepository,
    private readonly usersService: UsersService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  async createMessage({ content, chatId }: CreateMessageInput, userId: string) {
    const messageDocument: MessageDocument = {
      content,
      createdAt: new Date(),
      userId: new Types.ObjectId(userId),
      _id: new Types.ObjectId(),
    };
    // findOneAndUpdate() method is used to find a document and update it in the database.
    // we are using findOneAndUpdate instead of create so that we can avoid multiple calls to the database to check the userId logics. findOneAndUpdate allows us to add the logic in a single call in the filter query.
    await this.chatsRepository.findOneAndUpdate(
      // filter query to find the chat by chatId and userId.
      {
        _id: chatId,
      },
      // update query to push the message to the messages array of the chat.
      {
        // $push operator is used to add an element to an array.
        $push: {
          messages: messageDocument,
        },
      },
    );

    // create message entity using the messageDocument
    const message: Message = {
      ...messageDocument,
      chatId,
      user: await this.usersService.findOne(userId),
    };

    // publish the message to the chatId channel
    // the name should match the name of the subscription i.e. messageCreated
    await this.pubSub.publish(MESSAGE_CREATED, {
      messageCreated: message,
    });

    return message;
  }

  async getMessages(chatId: string) {
    // using aggregate pipleine to perform the following operations in one DB request
    return await this.chatsRepository.model.aggregate(
      // aggregation pipeline to filter the chat by chatId
      [
        {
          // $match operator is used to filter the documents
          $match: {
            _id: new Types.ObjectId(chatId),
          },
        },
        // $unwind operator is used to deconstruct an array field from the input documents to output a document for each element.
        {
          $unwind: '$messages',
        },
        // $replaceRoot operator is used to remove all the fields of the input document and replace them with the specified fields.
        {
          $replaceRoot: { newRoot: '$messages' },
        },
        // $lookup operator is used to perform a left outer join to another collection in the same database to filter in documents from the "joined" collection for processing.
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: '$user',
        },
        // $project operator is used to select the fields to include or exclude in the output document.
        {
          $unset: 'userId',
        },
        {
          $set: { chatId },
        },
      ],
    );
  }

  async messageCreated() {
    // MESSAGE_CREATED is the trigger that will be used to notify the client
    return this.pubSub.asyncIterator(MESSAGE_CREATED);
  }
}
