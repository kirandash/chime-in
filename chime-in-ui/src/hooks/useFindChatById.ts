import { useQuery } from "@apollo/client";
import { graphql } from "../gql";
import { ChatQueryVariables } from "../gql/graphql";

const FIND_CHAT_BY_ID = graphql(`
  query Chat($_id: String!) {
    chat(_id: $_id) {
      ...ChatFragment
    }
  }
`);

const useFindChatById = (variables: ChatQueryVariables) => {
  return useQuery(FIND_CHAT_BY_ID, { variables });
};

export { useFindChatById };
