import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { CreateMessageInput } from './dto/create-message.input';
import { CurrentUser } from '../../auth/current-user.decorator';
import { TokenPayload } from '../../auth/token-payload.interface';
import { GetMessagesArgs } from './dto/get-messages.args';
import { PUB_SUB } from '../../common/constants/injection-tokens';
import { PubSub } from 'graphql-subscriptions';
import { MessageCreatedArgs } from './dto/message-created.args';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(
    private readonly messagesService: MessagesService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @Mutation(() => Message)
  @UseGuards(GqlAuthGuard)
  async createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.messagesService.createMessage(createMessageInput, user._id);
  }

  @Query(() => [Message], { name: 'messages' })
  @UseGuards(GqlAuthGuard)
  async getMessages(
    @Args() getMessageArgs: GetMessagesArgs,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.messagesService.getMessages(getMessageArgs.chatId, user._id);
  }

  @Subscription(() => Message, {
    // This is the filter that will be used to determine if the client should be notified
    filter: (payload, variables, context) => {
      const userId = context.req.user._id;
      // The payload is the message that was created
      // The variables is the chatId that the client is listening to
      return (
        payload.messageCreated.chatId === variables.chatId &&
        userId !== payload.messageCreated.userId
      );
    },
  })
  // _messageCreatedArgs is not used but we added it as args so that the chatId can be added as a type for graphql codegen and then used in the filter above
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  messageCreated(
    @Args() messageCreatedArgs: MessageCreatedArgs,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.messagesService.messageCreated(messageCreatedArgs, user._id);
  }
}
