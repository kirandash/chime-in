import { ApolloClient, InMemoryCache } from "@apollo/client";
import { API_URL } from "./urls";

const client = new ApolloClient({
  // cache is a new instance of InMemoryCache. This will be used to store the data that we fetch from the server.
  cache: new InMemoryCache(),
  // uri is the URL of the GraphQL server that we want to connect to.
  uri: `${API_URL}/graphql`,
});

export default client;
