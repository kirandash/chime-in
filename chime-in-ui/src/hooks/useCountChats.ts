import { useCallback, useState } from "react";
import { API_URL } from "../constants/urls";
import { snackVar } from "../constants/snack";
import { UNKNOWN_ERROR_SNACK } from "../constants/errors";

const useCountChats = () => {
  const [chatsCount, setChatsCount] = useState<number | undefined>(undefined);

  const countChats = useCallback(async () => {
    const response = await fetch(`${API_URL}/chats/count`);
    if (!response.ok) {
      snackVar(UNKNOWN_ERROR_SNACK);
    }
    setChatsCount(parseInt(await response.text()));
  }, []);

  return { chatsCount, countChats };
};

export { useCountChats };
