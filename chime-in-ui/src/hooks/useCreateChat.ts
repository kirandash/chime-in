import { useMutation } from "@apollo/client";
import { graphql } from "../gql";
import { ChatFragment } from "../fragments/chat.fragment";

// ! means that the field is required.
const CREATE_CHAT = graphql(`
  mutation CreateChat($createChatInput: CreateChatInput!) {
    createChat(createChatInput: $createChatInput) {
      ...ChatFragment
    }
  }
`);

const useCreateChat = () => {
  return useMutation(CREATE_CHAT, {
    // cache is the Apollo cache. data is the response from the server.
    update(cache, { data }) {
      // Modify the cache to include the new chat.
      cache.modify({
        // The cache is modified by writing a new fragment to the cache.
        fields: {
          chats(existingChats = []) {
            // Write the new chat to the cache.
            const newChatRef = cache.writeFragment({
              data: data?.createChat,
              fragment: ChatFragment,
              fragmentName: "ChatFragment",
            });
            return [...existingChats, newChatRef];
          },
        },
      });
    },
  });
};

export { useCreateChat };
