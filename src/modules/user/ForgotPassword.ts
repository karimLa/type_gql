import { Resolver, Mutation, Arg } from 'type-graphql'
import uuid from 'uuid/v4'
import { redis } from '../../redis'
import { sendEmail } from '../../utils/sendEmail'
import { User } from '../../entities/User'
import { forgotPasswordPrefix } from '../constants/redisPrefixes'

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string
  ): Promise<boolean> {
    const user = await User.findOne({ where: { email } })

    if (!user) return true

    const token = uuid()
    await redis.set(forgotPasswordPrefix + token, user.id, "ex", 60 * 60 * 24)

    await sendEmail(email, `http://localhost:3000/user/change-password/${token}`)

    return true
  }
}