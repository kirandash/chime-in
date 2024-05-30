import { ObjectType, Field, Int } from '@nestjs/graphql';

// ObjectType decorator is used to define a class as a GraphQL object type.
@ObjectType()
export class User {
  // Field decorator is used to define a field as a GraphQL field.
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
