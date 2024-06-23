import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChatListItem from "./chat-list-item/ChatListItem";
import { Stack } from "@mui/material";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import { useState } from "react";
import ChatListConversationAdd from "./chat-list-conversation-add/ChatListConversationAdd";

const ChatList = () => {
  const [showAddChatConversationModal, setShowAddChatConversationModal] =
    useState(false);

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
          <ChatListItem />
          <Divider variant="inset" component="li" />
          <ChatListItem />
          <Divider variant="inset" component="li" />
          <ChatListItem />
          <Divider variant="inset" component="li" />
          <ChatListItem />
          <Divider variant="inset" component="li" />
          <ChatListItem />
          <Divider variant="inset" component="li" />
          <ChatListItem />
          <ChatListItem />
          <Divider variant="inset" component="li" />
          <ChatListItem />
          <Divider variant="inset" component="li" />
          <ChatListItem />
          <Divider variant="inset" component="li" />
          <ChatListItem />
        </List>
      </Stack>
    </>
  );
};

export default ChatList;
