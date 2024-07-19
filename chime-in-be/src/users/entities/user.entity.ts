import { AbstractEntity } from '../../common/database/abstract.entity';
import { Field, ObjectType } from '@nestjs/graphql';

// versionKey: false is used to disable the version key in the schema.
// Note: We are using both the @Schema() and @ObjectType() decorators to define a class as a Mongoose schema and a GraphQL object type. This is because we are using the same class for both Mongoose and GraphQL. And not creating separate files for Mongoose and GraphQL.
@ObjectType()
export class User extends AbstractEntity {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  imageUrl: string;
}
