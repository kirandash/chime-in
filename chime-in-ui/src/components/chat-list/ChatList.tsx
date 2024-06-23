import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChatListItem from "./chat-list-item/ChatListItem";
import { Stack } from "@mui/material";
import ChatListHeader from "./chat-list-header/ChatListHeader";

const ChatList = () => {
  return (
    <Stack>
      <ChatListHeader />
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
  );
};

export default ChatList;
