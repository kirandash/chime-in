import { useQuery } from "@apollo/client";
import { graphql } from "../gql";
import { QueryChatsArgs } from "../gql/graphql";

export const FIND_CHATS = graphql(`
  query Chats($skip: Int!, $limit: Int!) {
    chats(skip: $skip, limit: $limit) {
      ...ChatFragment
    }
  }
`);

const useFindChats = (variables: QueryChatsArgs) => {
  return useQuery(FIND_CHATS, { variables });
};

export { useFindChats };
