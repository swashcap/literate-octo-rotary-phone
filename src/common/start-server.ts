import { Server } from 'hapi'

export const startServer = async (getServer: () => Promise<Server>) => {
  const server = await getServer()
  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}
