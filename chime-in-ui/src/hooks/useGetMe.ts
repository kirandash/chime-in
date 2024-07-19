import { useQuery } from "@apollo/client";
import { graphql } from "../gql";

const GET_ME = graphql(`
  query Me {
    me {
      _id
      email
      username
    }
  }
`);

const useGetMe = () => {
  return useQuery(GET_ME);
};

export { useGetMe };
