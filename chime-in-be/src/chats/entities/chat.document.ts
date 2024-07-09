import { AbstractEntity } from '../../common/database/abstract.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MessageDocument } from '../messages/entities/message.document';

// Schema decorator is used to define a class as a Mongoose schema.
@Schema()
export class ChatDocument extends AbstractEntity {
  // Prop decorator is used to define a field as a Mongoose schema property.
  @Prop()
  userId: string;

  // @Prop()
  // isPrivate: boolean;

  // @Prop([String])
  // userIds: string[];

  @Prop()
  name: string;

  // One to many relationship between Chat and Message entities.
  @Prop([MessageDocument])
  messages: MessageDocument[];
}

// SchemaFactory.createForClass() method is used to create a Mongoose schema from a class.
export const ChatSchema = SchemaFactory.createForClass(ChatDocument);
