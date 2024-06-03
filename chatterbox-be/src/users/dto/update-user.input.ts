import { CreateUserInput } from './create-user.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
// Note: it is a good practice to not allow user to edit the id field since it should be fetched from the database. We have done this in user service
export class UpdateUserInput extends PartialType(CreateUserInput) {}
