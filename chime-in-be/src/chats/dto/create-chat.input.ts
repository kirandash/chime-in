import { InputType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateChatInput {
  @Field()
  // Transform is used to convert the string value to a boolean
  @Transform(({ value }) => value === 'true')
  // IsBoolean is used to validate the value is a boolean
  @IsBoolean()
  isPrivate: boolean;

  @Field(() => [String], { nullable: true })
  @IsArray()
  // each true is used to validate each value in the array is a string
  @IsString({ each: true })
  // each true is used to validate each value in the array is not empty
  @IsNotEmpty({ each: true })
  @IsOptional()
  userIds: string[];

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;
}
