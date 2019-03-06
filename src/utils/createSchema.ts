import { buildSchema } from 'type-graphql'
import { ForgotPasswordResolver } from '../modules/user/ForgotPassword'
import { RegisterResolver } from '../modules/user/Register'
import { LoginResolver } from '../modules/user/Login'
import { MeResolver } from '../modules/user/Me'
import { LogoutResolver } from '../modules/user/Logout'
import { ConfirmUserResolver } from '../modules/user/ConfirmUser'
import { ChangePasswordResolver } from '../modules/user/ChangePassword'

export const createSchema = () => buildSchema({
  resolvers: [
    RegisterResolver,
    LoginResolver,
    MeResolver,
    LogoutResolver,
    ForgotPasswordResolver,
    ChangePasswordResolver,
    ConfirmUserResolver,
  ],
  authChecker: ({ context: { req } }) => !!req.session.userId
})