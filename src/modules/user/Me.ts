import { Resolver, Query, Ctx } from 'type-graphql'
import { User } from '../../entities/User'
import { MyContext } from '../../types/MyContext'

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext) {
    const id = ctx.req.session!.userId

    if (!id) return null

    const user = User.findOne({ where: { id } })

    return user
  }
}