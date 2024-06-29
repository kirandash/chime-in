import { useMutation } from "@apollo/client";
import { graphql } from "../gql";

// ! means that the field is required.
const CREATE_MESSAGE = graphql(`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      _id
      content
      createdAt
    }
  }
`);

const useCreateMessage = () => {
  return useMutation(CREATE_MESSAGE);
};

export { useCreateMessage };
