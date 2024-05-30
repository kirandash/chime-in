import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

// Schema decorator is used to define a class as a Mongoose schema.
@Schema()
// AbstractDocument class is used to define a base class for all Mongoose documents.
export class AbstractDocument {
  // Prop decorator is used to define a field as a Mongoose schema property.
  @Prop({ type: SchemaTypes.ObjectId })
  // Types.ObjectId is used to define a field as a Mongoose ObjectId.
  _id: Types.ObjectId;
}
