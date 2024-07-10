import { useQuery } from "@apollo/client";
import { graphql } from "../gql";
import { MessagesQueryVariables } from "../gql/graphql";

export const GET_MESSAGES = graphql(`
  query Messages($chatId: String!, $skip: Int!, $limit: Int!) {
    messages(chatId: $chatId, skip: $skip, limit: $limit) {
      ...MessageFragment
    }
  }
`);

const useGetMessages = (variables: MessagesQueryVariables) => {
  return useQuery(GET_MESSAGES, { variables });
};

export { useGetMessages };
