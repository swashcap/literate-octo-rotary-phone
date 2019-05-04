import 'hard-rejection/register'

import hapi from 'hapi'
import handlebars from 'handlebars'
import good from 'good'
import vision from 'vision'

import { startServer } from '../common/start-server'

const getServer = async () => {
  const server = new hapi.Server({
    port: 3000
  })

  await server.register([
    {
      options: {
        context: {
          lang: 'en',
          title: 'literate-octo-rotary-phone'
        },
        engines: {
          html: handlebars
        },
        helpersPath: './templates/helpers',
        isCached: process.env.NODE_ENV === 'production' ? true : false,
        layout: true,
        layoutPath: './templates/layouts',
        partialsPath: './templates/partials',
        path: './templates',
        relativeTo: __dirname
      },
      plugin: vision
    },
    {
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
    }
  ])

  server.route({
    handler: {
      view: 'index'
    },
    method: 'GET',
    path: '/'
  })

  return server
}

if (require.main === module) {
  startServer(getServer)
}
