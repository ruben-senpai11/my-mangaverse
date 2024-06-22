import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';
import { ApolloLink } from '@apollo/client/link/core';

const httpLink = new HttpLink({
  uri: 'https://graphql.anilist.co', // Replace with your GraphQL endpoint
});

const client = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
});

export default client;
