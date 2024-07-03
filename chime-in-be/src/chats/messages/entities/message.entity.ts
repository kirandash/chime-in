import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractEntity } from '../../../common/database/abstract.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// ObjectType decorator is used to define a class as a GraphQL object type.
@ObjectType()
// Schema decorator is used to define a class as a Mongoose schema.
@Schema()
export class Message extends AbstractEntity {
  // Field decorator is used to define a field as a GraphQL field.
  @Field()
  // Prop decorator is used to define a field as a Mongoose schema property.
  @Prop()
  content: string;

  @Field()
  @Prop()
  createdAt: Date;

  @Field()
  @Prop()
  userId: string;

  @Field()
  @Prop()
  chatId: string;
}

// SchemaFactory.createForClass() method is used to create a Mongoose schema from a class.
export const MessageSchema = SchemaFactory.createForClass(Message);
