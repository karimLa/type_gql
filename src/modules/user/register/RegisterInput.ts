import { Length, IsEmail } from 'class-validator'
import { InputType, Field } from 'type-graphql'
import { isEmailUsed } from './isEmailUsed'
import { PasswordInput } from '../../shared/PasswordInput'

@InputType()
export class RegisterInput extends PasswordInput {
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
}