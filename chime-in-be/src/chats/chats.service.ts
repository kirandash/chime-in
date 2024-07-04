import { Injectable } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { ChatsRepository } from './chats.repository';

@Injectable()
export class ChatsService {
  constructor(private readonly chatsRepository: ChatsRepository) {}

  create(createChatInput: CreateChatInput, userId: string) {
    return this.chatsRepository.create({
      ...createChatInput,
      userId,
      // list of userIds to invite
      // if userIds is not provided, it will be an empty array
      userIds: createChatInput.userIds || [],
      messages: [],
    });
  }

  userChatFilter(userId: string) {
    return {
      // $or operator performs a logical OR operation on an array of two or more expressions.
      $or: [
        // If userId is equal to the userId of the chat, then user can access the chat.
        { userId },
        // If userId is in the list of userIds of the chat,then user can access the chat.
        { userIds: { $in: [userId] } },
        // If the chat is not private, then user can access the chat.
        { isPrivate: false },
      ],
    };
  }

  async findAll(userId: string) {
    return this.chatsRepository.find({
      ...this.userChatFilter(userId),
    });
  }

  async findOne(_id: string) {
    return this.chatsRepository.findOne({ _id });
  }

  update(id: number, updateChatInput: UpdateChatInput) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
