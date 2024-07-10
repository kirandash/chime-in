import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { PaginationArgs } from '../../../common/dto/pagination-args.dto';

// ArgsType is a decorator that is used to define a class as a GraphQL ArgsType.
@ArgsType()
export class GetMessagesArgs extends PaginationArgs {
  @Field()
  @IsNotEmpty()
  chatId: string;
}
