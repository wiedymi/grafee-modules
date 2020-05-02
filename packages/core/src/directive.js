import { addDirectiveResolveFunctionsToSchema } from 'graphql-directive'

const createDirective = (schema, resolver) => {
  return addDirectiveResolveFunctionsToSchema(schema, resolver)
}

export const getDirectives = (schema, directives) => {
  if (!directives || directives.length === 0) {
    return []
  }

  const resovlersMap = directives.reduce((next, { name, resolver }) => {
    next[name] = resolver

    return next
  }, {})

  return createDirective(schema, resovlersMap)
}
