import { ApolloCache } from "@apollo/client";
import { Message } from "../gql/graphql";
import { GET_MESSAGES } from "../hooks/useGetMessages";

export const updateMessages = (cache: ApolloCache<any>, message: Message) => {
  const messagesQuery = {
    query: GET_MESSAGES,
    variables: { chatId: message.chatId },
  };
  // readQuery() method is used to read a query from the cache for a given query object.
  const messages = cache.readQuery({
    ...messagesQuery,
  });
  cache.writeQuery({
    ...messagesQuery,
    data: {
      messages: (messages?.messages ?? []).concat(message),
    },
  });
};
