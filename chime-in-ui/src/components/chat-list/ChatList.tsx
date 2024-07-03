import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChatListItem from "./chat-list-item/ChatListItem";
import { Stack } from "@mui/material";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import { useState } from "react";
import ChatListConversationAdd from "./chat-list-conversation-add/ChatListConversationAdd";
import { useFindChats } from "../../hooks/useFindChats";

const ChatList = () => {
  const [showAddChatConversationModal, setShowAddChatConversationModal] =
    useState(false);
  const { data } = useFindChats();

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
            maxWidth: 360,
            bgcolor: "background.paper",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          {data?.chats.map((chat, index) => (
            <div key={chat._id}>
              <ChatListItem name={chat.name} _id={chat._id} />
              {index !== data.chats.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </div>
          ))}
        </List>
      </Stack>
    </>
  );
};

export default ChatList;
