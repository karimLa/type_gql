import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import cors from 'cors'
import { buildSchema, formatArgumentValidationError } from 'type-graphql'
import { createConnection } from 'typeorm'
import { redis } from './redis'
import path from 'path'

const main = async () => {
  await createConnection()

  const schema = await buildSchema({
    resolvers: [path.join(__dirname, 'modules', '**', '*.ts')],
    authChecker: ({ context: { req } }) => !!req.session.userId
  })

  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError,
    context: ({ req, res }: any) => ({ req, res })
  })
  
  const app = express()

  app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
  }))

  const RedisStore = connectRedis(session)

  app.use(session({
    store: new RedisStore({
      client: redis as any
    }),
    name: 'qid',
    secret: 'seassion_seceret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  }))


  apolloServer.applyMiddleware({ app })

  app.listen(5000, () => console.log(`- Server Started at http://localhost:5000/graphql`))
}

main()