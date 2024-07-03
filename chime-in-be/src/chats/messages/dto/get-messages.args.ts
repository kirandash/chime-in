import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

// ArgsType is a decorator that is used to define a class as a GraphQL ArgsType.
@ArgsType()
export class GetMessagesArgs {
  @Field()
  @IsNotEmpty()
  chatId: string;
}
