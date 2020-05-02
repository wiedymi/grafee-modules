# Grafee MongoDB Module

**Grafee** - is the easiest way to create an awesome GraphQL API.

## Getting started

```
yarn add @grafee/mongo
```

## Technologies

- [mongoose](https://www.npmjs.com/package/mongoose) - MongoDB object modeling tool designed to work in an asynchronous environment
- [mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2) - Add plugin to a schema and then use model paginate method
- [mongoose-aggregate-paginate-v2](https://github.com/aravindnc/mongoose-aggregate-paginate-v2) - Pagination for aggregators

## API

### Setup

To create connection with mongodb server

```
import { setup } from '@grafee/mongo'

const url = 'mongodb://localhost:27017/grafee'
const defaultOpt = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 100, // Reconnect every 100ms
}

setup(url, opts? = defaultOpt)

```

### createSchema

To create a mongoose schema with custom ID.

```
const userSchema = createSchema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: 'users' },
)
```

Result:

```
{
  id: 'f25d9b64-0988-4833-a703-49db58b6d2f1', // uuid
  email: 'some@email.com',
}
```

### createService

To create a service for making queries to mognodb.

```
import { createService } from '@grafee/mongo'
import { userSchema } from './userSchema'

export const userService = createService('User', userSchema)
```

### Pagination

To create pagination for mongoose schema.

```
import { addPaginate } from '@grafee/mongo'
import { userSchema } from './userSchema'

addPaginate(userSchema) // default pagination

addPaginate(userSchema, true) // pagination for aggregators
```

### license MIT

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
