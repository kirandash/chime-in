import Divider from "@mui/material/Divider";
import ChatListItem from "./chat-list-item/ChatListItem";
import { Box, Stack } from "@mui/material";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import { useEffect, useState } from "react";
import ChatListConversationAdd from "./chat-list-conversation-add/ChatListConversationAdd";
import { useFindChats } from "../../hooks/useFindChats";
import { usePath } from "../../hooks/usePath";
import { useMessageCreated } from "../../hooks/useMessageCreated";
import { PAGE_SIZE } from "../../constants/page-size";
import InfiniteScroll from "react-infinite-scroller";
import { useCountChats } from "../../hooks/useCountChats";

const ChatList = () => {
  const [showAddChatConversationModal, setShowAddChatConversationModal] =
    useState(false);
  const { data, fetchMore } = useFindChats({
    skip: 0,
    limit: PAGE_SIZE,
  });
  const { path } = usePath();
  const [selectedChatId, setSelectedChatId] = useState("");
  const { chatsCount, countChats } = useCountChats();

  useEffect(() => {
    countChats();
  }, [countChats]);

  // Subscribe to all chats
  useMessageCreated({ chatIds: data?.chats.map((chat) => chat._id) || [] });

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
        <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          <InfiniteScroll
            pageStart={0}
            loadMore={() =>
              fetchMore({
                variables: { skip: data?.chats.length, limit: PAGE_SIZE },
              })
            }
            hasMore={
              data?.chats && chatsCount ? data.chats.length < chatsCount : false
            }
            useWindow={false}
          >
            {data?.chats &&
              [...data.chats]
                .sort((a, b) => {
                  // chatroom with no latest message goes to the end
                  if (!a.latestMessage) return -1;
                  // sort by latest message
                  return (
                    new Date(a.latestMessage?.createdAt).getTime() -
                    new Date(b.latestMessage?.createdAt).getTime()
                  );
                })
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
                      <Divider variant="inset" />
                    )}
                  </div>
                ))
                .reverse()}
          </InfiniteScroll>
        </Box>
      </Stack>
    </>
  );
};

export default ChatList;
