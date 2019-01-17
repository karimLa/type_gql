import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { buildSchema, formatArgumentValidationError } from 'type-graphql'
import { createConnection } from 'typeorm'
import { RegisterResolver } from './modules/user/Register'



const main = async () => {
  await createConnection()

  const schema = await buildSchema({
    resolvers: [RegisterResolver]
  })

  const apolloServer = new ApolloServer({ schema, formatError: formatArgumentValidationError })

  const app = express()

  apolloServer.applyMiddleware({ app })

  app.listen(5000, () => console.log(`- Server Started at http://localhost:5000/graphql`))
}

main()