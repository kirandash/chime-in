import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

// Schema decorator is used to define a class as a Mongoose schema.
@Schema()
// AbstractEntity class is used to define a base class for all Mongoose documents.
// @ObjectType decorator is used to define a class as a GraphQL object type.
// { isAbstract: true } will make sure that id will be available in all the classes that extend this class.
@ObjectType({ isAbstract: true })
export class AbstractEntity {
  // Prop decorator is used to define a field as a Mongoose schema property.
  @Prop({ type: SchemaTypes.ObjectId })
  // explicitly required to define the type for ID because graphql doesn't know what type it is. whereas string etc can be inferred.
  @Field(() => ID)
  // Types.ObjectId is used to define a field as a Mongoose ObjectId.
  _id: Types.ObjectId;
}
