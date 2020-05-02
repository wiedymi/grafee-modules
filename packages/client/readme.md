# Grafee Client

**Grafee** is the easiest way to create an awesome GraphQL API.

## Getting started

```
yarn add @grafee/client
```

## Technologies

- [@apollo/react-hooks](https://www.npmjs.com/package/@apollo/react-hooks) - Apollo GraphQL React Hooks
- [graphql-tag](https://www.npmjs.com/package/graphql-tag) - gql tag

## API

### gql

This is a template literal tag you can use to concisely write a GraphQL query that is parsed into the standard GraphQL AST

For more information: [graphql-tag](https://www.npmjs.com/package/graphql-tag)

```js
import { gql } from "@grafee/client";

export const USERS = gql`
  query {
    users(offset: 0, limit: 10) {
      docs {
        id
        username
        email
      }
    }
  }
`;
```

### createQuery

[FULL API](https://www.apollographql.com/docs/react/api/react-hooks/)

```js
import { createQuery } from '@grafee/client'
import { USER } from './queries'

const getUser = createQuery(USER)

const { data, loading, error, fetchMore } = getUser(opts?) // React Hooks
```

### createMutation

[FULL API](https://www.apollographql.com/docs/react/api/react-hooks/)

```js
import { createMutation } from '@grafee/client'
import { CREATE_USER } from './mutations'

const userMutation = createMutation(CREATE_USER)

const [createUser, { data, loading, error }] = userMutation(opts?) // React Hooks
```

### createLazyQuery

[FULL API](https://www.apollographql.com/docs/react/api/react-hooks/)

```js
import { createLazyQuery } from '@grafee/client'
import { USER } from './queries'

const getLazyUser = createLazyQuery(USER)

const [loadUser, { data, loading, error, colled }] = getLazyUser(opts?) // React Hooks
```

### createSubscription

[FULL API](https://www.apollographql.com/docs/react/api/react-hooks/)

```js
import { createSubscription } from '@grafee/client'
import { SUB_USER } from './subscriptions'

const subUser = createSubscription(SUB_USER)

const { data, loading, error } = subUser(opts?) // React Hooks
```

### getClient

`client` is now set to the `ApolloClient` instance being used by the application (that was configured using something like `ApolloProvider`

```js
import { getClient } from "@grafee/client";

const client = getClient(); // React Hooks
```

[FULL API](https://www.apollographql.com/docs/react/api/react-hooks/)

### storage (localStorage)

To manage localStorage in easiest way

```js
import { storage } from "@grafee/client";

storage.set(key, value); // localStorage.setItem
storage.get(key); // localStorage.getItem
storage.clear(); // localStorage.clear
storage.length(); // localStorage.length
storage.key(index); // localStorage.key(index)
storage.remove(key); // localStorage.removeItem(key)
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
