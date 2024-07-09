import { AbstractEntity } from '../../../common/database/abstract.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

// Schema decorator is used to define a class as a Mongoose schema.
@Schema()
export class MessageDocument extends AbstractEntity {
  // Prop decorator is used to define a field as a Mongoose schema property.
  @Prop()
  content: string;

  @Prop()
  createdAt: Date;

  @Prop()
  userId: Types.ObjectId;
}

// SchemaFactory.createForClass() method is used to create a Mongoose schema from a class.
export const MessageSchema = SchemaFactory.createForClass(MessageDocument);
