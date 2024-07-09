import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
// InputType decorator is used to define a class as a GraphQL input type.
@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  password: string;
}
