import { useMutation } from "@apollo/client";
import { graphql } from "../gql";
import { GET_MESSAGES } from "./useGetMessages";

// ! means that the field is required.
const CREATE_MESSAGE = graphql(`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      ...MessageFragment
    }
  }
`);

const useCreateMessage = (chatId: string) => {
  return useMutation(CREATE_MESSAGE, {
    // cache is the Apollo cache. data is the response from the server.
    update(cache, { data }) {
      const messagesQuery = {
        query: GET_MESSAGES,
        variables: { chatId },
      };
      // readQuery() method is used to read a query from the cache for a given query object.
      const messages = cache.readQuery({
        ...messagesQuery,
      });
      if (!messages || !data?.createMessage) {
        return;
      }
      cache.writeQuery({
        ...messagesQuery,
        data: {
          messages: messages.messages.concat(data?.createMessage),
        },
      });
    },
  });
};

export { useCreateMessage };
