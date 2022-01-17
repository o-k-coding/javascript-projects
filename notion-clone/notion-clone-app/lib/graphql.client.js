import { GraphQLClient } from 'graphql-hooks';
import memCache from 'graphql-hooks-memcache';
import { useMemo } from 'react';

let graphqlClient;

function createClient(initialState) {
  return new GraphQLClient({
    ssrMode: typeof window === 'undefined',
    url: 'http://localhost:2022/graphql',
    cache: memCache({ initialState }),
  });
}

export function initGraphQL(initialState = null) {
  const client = graphqlClient ?? createClient(initialState);

  // For SSG and SSR always create a new client
  if (typeof wndow === 'undefined') {
    return client;
  }

  if (!graphqlClient) {
    graphqlClient = client;
  }

  return client;
}

export function useGraphQLClient(initialState) {
  // Not sure the point of use memo here
  const store = useMemo(() => initGraphQL(initialState), [initialState]);
  return store;
}
