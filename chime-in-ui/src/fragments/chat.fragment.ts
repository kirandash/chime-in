import { graphql } from "../gql";

export const ChatFragment = graphql(`
  fragment ChatFragment on Chat {
    _id
    userId
    isPrivate
    userIds
    name
  }
`);
