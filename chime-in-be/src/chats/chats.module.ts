import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsResolver } from './chats.resolver';
import { ChatsRepository } from './chats.repository';
import { DatabaseModule } from '../common/database/database.module';
import { ChatSchema } from './entities/chat.entity';

@Module({
  imports: [DatabaseModule.forFeature([{ name: 'Chat', schema: ChatSchema }])],
  providers: [ChatsResolver, ChatsService, ChatsRepository],
})
export class ChatsModule {}
