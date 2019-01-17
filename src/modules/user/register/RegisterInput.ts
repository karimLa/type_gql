import { Length, IsEmail } from 'class-validator'
import { InputType, Field } from 'type-graphql';
import { isEmailUsed } from './isEmailUsed';

@InputType()
export class RegisterInput {
  @Field()
  @Length(2, 255)
  firstName: string

  @Field()
  @Length(2, 255)
  lastName: string

  @Field()
  @IsEmail()
  @isEmailUsed({ message: 'Invalid Register' })
  email: string

  @Field()
  @Length(8, 255)
  password: string
}