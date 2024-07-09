import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChatListItem from "./chat-list-item/ChatListItem";
import { Stack } from "@mui/material";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import { useEffect, useState } from "react";
import ChatListConversationAdd from "./chat-list-conversation-add/ChatListConversationAdd";
import { useFindChats } from "../../hooks/useFindChats";
import { usePath } from "../../hooks/usePath";

const ChatList = () => {
  const [showAddChatConversationModal, setShowAddChatConversationModal] =
    useState(false);
  const { data } = useFindChats();
  const { path } = usePath();
  const [selectedChatId, setSelectedChatId] = useState("");

  useEffect(() => {
    const pathParts = path.split("chats/");
    if (pathParts.length === 2) {
      setSelectedChatId(pathParts[1]);
    }
  }, [path]);

  return (
    <>
      <ChatListConversationAdd
        open={showAddChatConversationModal}
        handleClose={() => setShowAddChatConversationModal(false)}
      />
      <Stack>
        <ChatListHeader
          handleAddChat={() => setShowAddChatConversationModal(true)}
        />
        <Divider />
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          {data?.chats
            .map((chat, index) => (
              <div key={chat._id}>
                <ChatListItem
                  username={chat.latestMessage?.user.username}
                  latestMessageContent={chat.latestMessage?.content}
                  name={chat.name}
                  _id={chat._id}
                  selected={selectedChatId === chat._id}
                />
                {index !== data.chats.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </div>
            ))
            .reverse()}
        </List>
      </Stack>
    </>
  );
};

export default ChatList;
