import { useMutation } from "@apollo/client";
import { graphql } from "../gql";

// ! means that the field is required.
const CREATE_CHAT = graphql(`
  mutation CreateChat($createChatInput: CreateChatInput!) {
    createChat(createChatInput: $createChatInput) {
      ...ChatFragment
    }
  }
`);

const useCreateChat = () => {
  return useMutation(CREATE_CHAT);
};

export { useCreateChat };
