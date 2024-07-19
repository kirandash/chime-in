import { Module, forwardRef } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsResolver } from './chats.resolver';
import { ChatsRepository } from './chats.repository';
import { DatabaseModule } from '../common/database/database.module';
import { ChatSchema } from './entities/chat.document';
import { MessagesModule } from './messages/messages.module';
import { ChatsController } from './chats.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule.forFeature([{ name: 'Chat', schema: ChatSchema }]),
    forwardRef(() => MessagesModule),
  ],
  providers: [ChatsResolver, ChatsService, ChatsRepository],
  exports: [ChatsRepository],
  controllers: [ChatsController],
})
export class ChatsModule {}
