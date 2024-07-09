import { graphql } from "../gql";

export const MessageFragment = graphql(`
  fragment MessageFragment on Message {
    _id
    content
    createdAt
    chatId
    user {
      _id
      username
      email
    }
  }
`);
