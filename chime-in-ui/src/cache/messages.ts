import { ApolloCache } from "@apollo/client";
import { Message } from "../gql/graphql";
import { GET_MESSAGES } from "../hooks/useGetMessages";
import { PAGE_SIZE } from "../constants/page-size";

export const updateMessages = (cache: ApolloCache<any>, message: Message) => {
  const messagesQuery = {
    query: GET_MESSAGES,
    variables: { chatId: message.chatId, skip: 0, limit: PAGE_SIZE },
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
