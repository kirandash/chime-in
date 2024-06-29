import { Module, forwardRef } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { ChatsModule } from '../chats.module';

@Module({
  // ChatsModule is imported to use ChatsRepository in MessagesService.
  imports: [forwardRef(() => ChatsModule)],
  providers: [MessagesResolver, MessagesService],
})
export class MessagesModule {}
