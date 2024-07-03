import { useSubscription } from "@apollo/client";
import { graphql } from "../gql";
import { SubscriptionMessageCreatedArgs } from "../gql/graphql";

const MESSAGE_CREATED = graphql(`
  subscription MessageCreated($chatId: String!) {
    messageCreated(chatId: $chatId) {
      ...MessageFragment
    }
  }
`);

const useMessageCreated = (variables: SubscriptionMessageCreatedArgs) => {
  return useSubscription(MESSAGE_CREATED, { variables });
};

export { useMessageCreated };
