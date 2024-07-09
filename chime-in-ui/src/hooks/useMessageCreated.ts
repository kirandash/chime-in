import { useSubscription } from "@apollo/client";
import { graphql } from "../gql";
import { SubscriptionMessageCreatedArgs } from "../gql/graphql";
import { updateMessages } from "../cache/messages";
import { updateLatestMessage } from "../cache/latest-message";

const MESSAGE_CREATED = graphql(`
  subscription MessageCreated($chatId: String!) {
    messageCreated(chatId: $chatId) {
      ...MessageFragment
    }
  }
`);

const useMessageCreated = (variables: SubscriptionMessageCreatedArgs) => {
  return useSubscription(MESSAGE_CREATED, {
    variables,
    onData: ({ client, data }) => {
      if (data.data) {
        updateMessages(client.cache, data.data.messageCreated);
        updateLatestMessage(client.cache, data.data.messageCreated);
      }
    },
  });
};

export { useMessageCreated };
