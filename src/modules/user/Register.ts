import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import bcrypt from 'bcryptjs'
import { User } from '../../entities/User'
import { RegisterInput } from './register/RegisterInput'

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return 'Hello World'
  }

  @Mutation(() => User)
  async register(
    @Arg('data') { email, firstName, lastName, password }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ firstName, lastName, email, password: hashedPassword }).save()
    return user
  }
}