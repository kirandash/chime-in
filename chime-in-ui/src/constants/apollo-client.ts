import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { API_URL, WS_URL } from "./urls";
import { onError } from "@apollo/client/link/error";
import excludedRoutes from "./excluded-routes";
import { onLogout } from "../utils/logout";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const logoutLink = onError((error) => {
  if (
    error.graphQLErrors?.length &&
    (error.graphQLErrors[0].extensions?.originalError as any)?.statusCode ===
      401
  ) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      onLogout();
    }
  }
});

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
});

// create a new instance of GraphQLWsLink and pass the client object to it.
const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${WS_URL}/graphql`,
  })
);

// splitLink is a new instance of split. This will be used to split the request based on the operation type.
const splitLink = split(
  // split the request based on the operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  // if the operation type is subscription, then use wsLink (if query is true, use wsLink, otherwise use httpLink)
  wsLink,
  // if the operation type is not subscription, then use httpLink
  httpLink
);

const client = new ApolloClient({
  // cache is a new instance of InMemoryCache. This will be used to store the data that we fetch from the server.
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          chats: {
            // keyArgs is set to false, which means that we don't want to cache separate results based on different arguments.
            keyArgs: false,
            merge,
          },
          messages: {
            // keyArgs is set to ["chatId"], which means that we want to cache separate results based on different chatIds.
            keyArgs: ["chatId"],
            merge,
          },
        },
      },
    },
  }),
  // uri is the URL of the GraphQL server that we want to connect to.
  uri: `${API_URL}/graphql`,
  link: logoutLink.concat(splitLink),
});

// merge is a function that will be called when we fetch more data from the server.
function merge(existing: any, incoming: any, { args }: any) {
  const merged = existing ? existing.slice(0) : [];
  // loop through the incoming data and add it to the merged array
  for (let i = 0; i < incoming.length; ++i) {
    merged[args.skip + i] = incoming[i];
    // merged[10] = incoming[0]
    // merged[11] = incoming[1]
    // merged[12] = incoming[2]
    // merged[13] = incoming[3]
  }
  return merged;
}

export default client;
