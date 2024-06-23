import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractEntity } from '../../common/database/abstract.entity';
import { Field, ObjectType } from '@nestjs/graphql';

// versionKey: false is used to disable the version key in the schema.
// Note: We are using both the @Schema() and @ObjectType() decorators to define a class as a Mongoose schema and a GraphQL object type. This is because we are using the same class for both Mongoose and GraphQL. And not creating separate files for Mongoose and GraphQL.
@Schema({ versionKey: false })
@ObjectType()
export class User extends AbstractEntity {
  // Prop decorator is used to define a field as a Mongoose schema property.
  @Prop()
  @Field()
  email: string;

  @Prop()
  // don't use @Field() decorator for password field to prevent it from being exposed in the GraphQL schema
  password: string;
}

// SchemaFactory.createForClass() method is used to create a Mongoose schema from a class.
export const UserSchema = SchemaFactory.createForClass(User);
