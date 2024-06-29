import { useQuery } from "@apollo/client";
import { graphql } from "../gql";

const FIND_CHATS = graphql(`
  query Chats {
    chats {
      ...ChatFragment
    }
  }
`);

const useFindChats = () => {
  return useQuery(FIND_CHATS);
};

export { useFindChats };
