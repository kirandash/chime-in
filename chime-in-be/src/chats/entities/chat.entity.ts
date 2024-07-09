import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractEntity } from '../../common/database/abstract.entity';
import { Message } from '../messages/entities/message.entity';

// ObjectType decorator is used to define a class as a GraphQL object type.
@ObjectType()
export class Chat extends AbstractEntity {
  @Field()
  name: string;

  @Field(() => Message, { nullable: true })
  latestMessage?: Message;
}
