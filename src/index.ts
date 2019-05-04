import 'hard-rejection/register'

import hapi from 'hapi'
import { ApolloServer } from 'apollo-server-hapi'

const getServer = async () => {
  const apolloServer = new ApolloServer({})
  const server = new hapi.Server({
    port: 3000
  })

  await apolloServer.applyMiddleware({
    app: server
  })

  await apolloServer.installSubscriptionHandlers(server.listener)

  return server
}

if (require.main === module) {
  ;(async () => {
    const server = await getServer()
    await server.start()
    console.log(`Server running at: ${server.info.uri}`)
  })()
}
