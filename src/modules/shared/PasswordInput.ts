import { Length } from 'class-validator'
import { InputType, Field } from 'type-graphql'

@InputType()
export class PasswordInput {
  @Field()
  @Length(8, 255)
  password: string
}