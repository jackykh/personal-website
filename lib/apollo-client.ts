import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
const STRAPI_URI = process.env.NEXT_PUBLIC_STRAPI_URI;
const client = new ApolloClient({
  link: createHttpLink({
    uri: STRAPI_URI,
  }),
  cache: new InMemoryCache(),
});

export default client;
