import { useMutation } from "@apollo/client";
import { graphql } from "../gql";
import { updateMessages } from "../cache/messages";

// ! means that the field is required.
const CREATE_MESSAGE = graphql(`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      ...MessageFragment
    }
  }
`);

const useCreateMessage = () => {
  return useMutation(CREATE_MESSAGE, {
    // cache is the Apollo cache. data is the response from the server.
    update(cache, { data }) {
      if (data?.createMessage) {
        updateMessages(cache, data.createMessage);
      }
    },
  });
};

export { useCreateMessage };
