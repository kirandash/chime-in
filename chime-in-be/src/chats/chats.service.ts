import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { ChatsRepository } from './chats.repository';
import { PipelineStage, Types } from 'mongoose';
import { PaginationArgs } from '../common/dto/pagination-args.dto';

@Injectable()
export class ChatsService {
  constructor(private readonly chatsRepository: ChatsRepository) {}

  create(createChatInput: CreateChatInput, userId: string) {
    return this.chatsRepository.create({
      ...createChatInput,
      userId,
      // list of userIds to invite
      // if userIds is not provided, it will be an empty array
      // userIds: createChatInput.userIds || [],
      messages: [],
    });
  }

  async countChats() {
    return await this.chatsRepository.model.countDocuments({});
  }

  async findMany(
    prePipelineStages: PipelineStage[] = [],
    paginationArgs: PaginationArgs,
  ) {
    const chats = await this.chatsRepository.model.aggregate([
      ...prePipelineStages,
      {
        $set: {
          latestMessage: {
            // conditional operator to check if messages is empty and return an object with createdAt field or the last message from messages
            $cond: [
              '$messages',
              { $arrayElemAt: ['$messages', -1] },
              { createdAt: new Date() },
            ],
          },
        },
      },
      // sort the chat using messages creation time to avoid skewed results
      { $sort: { 'latestMessage.createdAt': -1 } },
      { $skip: paginationArgs.skip },
      { $limit: paginationArgs.limit },
      // remove messages as it can get very large and consume a lot of memory
      { $unset: 'messages' },
      {
        $lookup: {
          from: 'users',
          localField: 'latestMessage.userId',
          foreignField: '_id',
          // this will return an array with one element
          as: 'latestMessage.user',
        },
      },
    ]);
    // clean ups
    chats.forEach((chat) => {
      if (!chat.latestMessage._id) {
        delete chat.latestMessage;
        return;
      }
      // latestMessage.user is an array with one element
      chat.latestMessage.user = chat.latestMessage.user[0];
      delete chat.latestMessage.userId;
      chat.latestMessage.chatId = chat._id;
    });
    return chats;
  }

  async findOne(_id: string) {
    const chats = await this.findMany([
      { $match: { chatId: new Types.ObjectId(_id) } },
    ]);
    if (!chats[0]) {
      throw new NotFoundException(`No chat was found with ID ${_id}`);
    }
    return chats[0];
  }

  update(id: number, updateChatInput: UpdateChatInput) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
