import { useCallback, useState } from "react";
import { API_URL } from "../constants/urls";
import { snackVar } from "../constants/snack";
import { UNKNOWN_ERROR_SNACK } from "../constants/errors";

const useCountMessages = (chatId: string) => {
  const [messagesCount, setMessagesCount] = useState<number | undefined>(
    undefined
  );

  const countMessages = useCallback(async () => {
    const response = await fetch(`${API_URL}/messages/count?chatId=${chatId}`);
    if (!response.ok) {
      snackVar(UNKNOWN_ERROR_SNACK);
    }
    const { messages } = await response.json();
    setMessagesCount(messages);
  }, [chatId]);

  return { messagesCount, countMessages };
};

export { useCountMessages };
