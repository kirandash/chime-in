import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractEntity } from '../../../common/database/abstract.entity';
import { User } from '../../../users/entities/user.entity';

// ObjectType decorator is used to define a class as a GraphQL object type.
@ObjectType()
export class Message extends AbstractEntity {
  // Field decorator is used to define a field as a GraphQL field.
  @Field()
  content: string;

  @Field()
  createdAt: Date;

  @Field(() => User)
  user: User;

  @Field()
  chatId: string;
}
