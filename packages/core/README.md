# Grafee Core

**Grafee** - is the easiest way to create an awesome GraphQL API.

## Getting started

```
yarn add @grafee/core
```

## Technologies

- [@graphql-modules/core](https://www.npmjs.com/package/@graphql-modules/core) - GraphQL Modules
- [apollo-server-express](https://www.npmjs.com/package/apollo-server-express) - Apollo server for Express
- [express](https://www.npmjs.com/package/express) - Server
- [graphql](https://www.npmjs.com/package/graphql) - GraphQL
- [esm](https://www.npmjs.com/package/esm) - IMPORT/EXPORT
- [graphql-directive](https://www.npmjs.com/package/graphql-directive) - For creating GraphQL directives
- [graphql-shield](https://www.npmjs.com/package/graphql-shield) - Access control for GraphQL
- [graphql-validation](https://www.npmjs.com/package/graphql-validation) - Additional validation for GraphQL
- [module-alias](https://www.npmjs.com/package/module-alias) - Alies

### Setup

To enable ES6 features, alies and import .graphql files

index.js

```js
const { setup } = require('@grafee/core')

setup('/application.js')

setup('/application.js', true) // Run application in cluster mode
```

application.js

```js
import { ApolloServer } from '@grafee/core'
import rootModule from '@/modules'

const { schema } = rootModule

const application = ApolloServer({
  schema,
  middlewares,
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
    schemaTag: 'production',
  },
})

const port = process.env.PORT || 4040
application.listen({
  port,
  host: '0.0.0.0',
})

console.log(`🚀  GraphQL: http://localhost:${port + application.path}`)
console.log(`🚀  Subscriptions: ws://localhost:${port + application.subscriptions}`)

```

## API

### createModule

To create a module. [Full API](https://www.npmjs.com/package/@graphql-modules/core)

```js
import { createModule } from '@grafee/core'
import { userService } from '@/services' // @grafee/mongo
import * as typeDefs from './schema.graphql'
import * as resolvers from './resolvers'

export default createModule({
  typeDefs,
  resolvers,
  context: {
    db: userService,
  },
})
```

### ApolloServer

```js
import { ApolloServer } from '@grafee/core'
import { setup } from '@grafee/mongo'
import { auth } from '@/passport'
import schema from '@/modules'
import access from '@/access' // @grafee/sheild

const middlewares = [auth, access]

const application = ApolloServer({
  schema,
  middlewares,
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
    schemaTag: 'production',
  },
})

const port = process.env.PORT || 4040
application.listen({
  port,
  host: '0.0.0.0',
})

console.log(`🚀  GraphQL: http://localhost:${port + application.path}`)
console.log(`🚀  Subscriptions: ws://localhost:${port + application.subscriptions}`)

```

## MIT License

```
MIT License

Copyright (c) 2019 Yakauleu Uladzislau

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
