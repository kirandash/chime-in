import { InputType, Int, Field } from '@nestjs/graphql';
// InputType decorator is used to define a class as a GraphQL input type.
@InputType()
export class CreateUserInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
