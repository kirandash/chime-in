import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { API_URL } from "./urls";
import { onError } from "@apollo/client/link/error";
import excludedRoutes from "./excluded-routes";
import { onLogout } from "../utils/logout";

const logoutLink = onError((error) => {
  if (
    error.graphQLErrors?.length &&
    (error.graphQLErrors[0].extensions.originalError as any).statusCode === 401
  ) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      // onLogout();
    }
  }
});

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
});

const client = new ApolloClient({
  // cache is a new instance of InMemoryCache. This will be used to store the data that we fetch from the server.
  cache: new InMemoryCache(),
  // uri is the URL of the GraphQL server that we want to connect to.
  uri: `${API_URL}/graphql`,
  link: logoutLink.concat(httpLink),
});

export default client;
