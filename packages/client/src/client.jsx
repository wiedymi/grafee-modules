import React from "react";
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { ApolloClient } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloLinkTimeout from "apollo-link-timeout";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

export const cache = new InMemoryCache();

export function setup(
  urls = {},
  links = false,
  opts = { logger: true, timeout: 5000, typeDefs: {}, resolvers: {} }
) {
  if (!urls) {
    throw new Error("No http link provided");
  }

  const httpLink = createUploadLink({
    uri: urls.HTTP_API,
  });

  let wsLink = (props) => props;
  if (urls.WS_API) {
    wsLink = new WebSocketLink({
      uri: urls.WS_API,
      options: {
        reconnect: true,
      },
    });
  }
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(`GraphQL Error: ${message}`)
      );
    }
    if (networkError) {
      console.log(`Network Error: ${networkError.message}`);
    }
  });

  const loggerLink = (isActive) => {
    if (isActive) {
      return new ApolloLink((operation, forward) => {
        console.log(`GraphQL Request: ${operation.operationName}`);
        operation.setContext({ start: new Date() });
        return forward(operation).map((response) => {
          const responseTime = new Date() - operation.getContext().start;
          console.log(`GraphQL Response took: ${responseTime}`);
          return response;
        });
      });
    }

    return (props) => props;
  };

  const timeoutLink = (timeout) => new ApolloLinkTimeout(timeout);

  const defaultLinks = ApolloLink.from([
    httpLink,
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    errorLink,
    timeoutLink(opts.timeout),
    loggerLink(opts.logger),
  ]);

  const client = new ApolloClient({
    link: links ? links : defaultLinks,
    cache,
    typeDefs: opts.typeDefs,
    resolvers: opts.resolvers,
  });

  return (App) => {
    return (
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
  };
}
