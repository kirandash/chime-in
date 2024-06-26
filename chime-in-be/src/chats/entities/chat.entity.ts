import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractEntity } from '../../common/database/abstract.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Message } from '../messages/entities/message.entity';

// ObjectType decorator is used to define a class as a GraphQL object type.
@ObjectType()
// Schema decorator is used to define a class as a Mongoose schema.
@Schema()
export class Chat extends AbstractEntity {
  // Field decorator is used to define a field as a GraphQL field.
  @Field()
  // Prop decorator is used to define a field as a Mongoose schema property.
  @Prop()
  userId: string;

  @Field()
  @Prop()
  isPrivate: boolean;

  @Field(() => [String])
  @Prop([String])
  userIds: string[];

  @Field({ nullable: true })
  @Prop()
  name?: string;

  // One to many relationship between Chat and Message entities.
  @Prop([Message])
  messages: Message[];
}

// SchemaFactory.createForClass() method is used to create a Mongoose schema from a class.
export const ChatSchema = SchemaFactory.createForClass(Chat);
