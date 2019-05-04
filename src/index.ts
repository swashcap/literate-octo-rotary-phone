import 'hard-rejection/register'

import hapi from 'hapi'
import good from 'good'
import { ApolloServer, gql } from 'apollo-server-hapi'

const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling'
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
]

const typeDefs = gql`
  type Query {
    books: [Book]
  }
  type Book {
    title: String
    author: String
  }
`

const resolvers = {
  Query: { books: () => books }
}

const getServer = async () => {
  const apolloServer = new ApolloServer({
    resolvers,
    typeDefs
  })
  const server = new hapi.Server({
    port: 3000
  })

  await apolloServer.applyMiddleware({
    app: server
  })

  await apolloServer.installSubscriptionHandlers(server.listener)

  await server.register({
    options: {
      ops: {
        interval: 1000
      },
      reporters: {
        myConsoleReporter: [
          {
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
          },
          {
            module: 'good-console'
          },
          'stdout'
        ]
      }
    },
    plugin: good
  })

  return server
}

if (require.main === module) {
  ;(async () => {
    const server = await getServer()
    await server.start()
    console.log(`Server running at: ${server.info.uri}`)
  })()
}
