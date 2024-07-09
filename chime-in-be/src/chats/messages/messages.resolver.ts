import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { CreateMessageInput } from './dto/create-message.input';
import { CurrentUser } from '../../auth/current-user.decorator';
import { TokenPayload } from '../../auth/token-payload.interface';
import { GetMessagesArgs } from './dto/get-messages.args';
import { MessageCreatedArgs } from './dto/message-created.args';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Mutation(() => Message)
  @UseGuards(GqlAuthGuard)
  async createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
    @CurrentUser() user: TokenPayload,
  ): Promise<Message> {
    return this.messagesService.createMessage(createMessageInput, user._id);
  }

  @Query(() => [Message], { name: 'messages' })
  @UseGuards(GqlAuthGuard)
  async getMessages(
    @Args() getMessageArgs: GetMessagesArgs,
  ): Promise<Message[]> {
    // TODO: Fix the type
    return this.messagesService.getMessages(getMessageArgs.chatId);
  }

  @Subscription(() => Message, {
    // This is the filter that will be used to determine if the client should be notified
    filter: (payload, variables, context) => {
      const userId = context.req.user._id;
      const message: Message = payload.messageCreated;
      // The payload is the message that was created
      // The variables is the chatId that the client is listening to
      return (
        message.chatId === variables.chatId &&
        userId !== message.user._id.toHexString()
      );
    },
  })
  // _messageCreatedArgs is not used but we added it as args so that the chatId can be added as a type for graphql codegen and then used in the filter above
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  messageCreated(@Args() messageCreatedArgs: MessageCreatedArgs) {
    return this.messagesService.messageCreated(messageCreatedArgs);
  }
}
