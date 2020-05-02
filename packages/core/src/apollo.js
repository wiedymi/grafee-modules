import http from 'http'
import express from 'express'
import { applyMiddleware } from 'graphql-middleware'
import { ApolloServer as Apollo } from 'apollo-server-express'
import { getDirectives } from './directive'

const app = express()

const defaultSetting = {
  middlewares: [],
  introspection: true,
  context: ({ req, connection }) => {
    if (connection) {
      return connection.context.request
    }

    return req
  },
  trace: true,
  debug: true,
  subscriptions: {
    onConnect: (connectionParams, webSocket, context) => {
      return context
    },
  },
}

const ApolloServer = (opts) => {
  const settings = {
    ...defaultSetting,
    ...opts,
  }
  const { schema, middlewares, directives, ...options } = settings

  const apollo = new Apollo({
    ...options,
    schema: applyMiddleware(schema, ...middlewares),
    schemaDirectives: getDirectives(schema, directives),
  })

  const path = '/graphql'

  apollo.use = (...params) => {
    return app.use(...params)
  }

  apollo.path = apollo.graphqlPath
  apollo.subscriptions = apollo.subscriptionsPath

  apollo.applyMiddleware({ app, path })

  const server = http.createServer(app)
  apollo.installSubscriptionHandlers(server)

  apollo.listen = (...params) => {
    return server.listen(...params)
  }

  return apollo
}

const GrafeeServer = ApolloServer
export { ApolloServer, GrafeeServer }
