import { useLocation, useParams } from "react-router-dom";
import { useFindChatById } from "../../hooks/useFindChatById";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useEffect, useRef, useState } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";
import { PAGE_SIZE } from "../../constants/page-size";
import { useCountMessages } from "../../hooks/useCountMessages";
import InfiniteScroll from "react-infinite-scroller";

const Chat = () => {
  const params = useParams();
  if (!params._id) {
    throw new Error("Chat _id is required");
  }
  const chatId = params._id;
  const { data } = useFindChatById({ _id: chatId });
  const [message, setMessage] = useState("");
  const [createMessage] = useCreateMessage();
  // Existing messages from graphql query
  const { data: messages, fetchMore } = useGetMessages({
    chatId,
    skip: 0,
    limit: PAGE_SIZE,
  });
  const { messagesCount, countMessages } = useCountMessages(chatId);

  useEffect(() => {
    countMessages();
  }, [countMessages]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const handleCreateMessage = async () => {
    await createMessage({
      variables: {
        createMessageInput: {
          chatId,
          content: message,
        },
      },
    });
    setMessage("");
    scrollToBottom();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    // Scroll to the bottom if the user has not loaded more messages
    // will scroll only when switching between chats
    if (messages?.messages && messages.messages.length <= PAGE_SIZE) {
      setMessage("");
      scrollToBottom();
    }
  }, [location, messages]);

  return (
    <Stack sx={{ height: "90vh", justifyContent: "space-between", p: "15px" }}>
      <h2>{data?.chat.name}</h2>
      <Box sx={{ maxHeight: "70vh", overflow: "scroll" }}>
        <InfiniteScroll
          pageStart={0}
          // Reverse the scroll direction
          isReverse={true}
          loadMore={() => {
            console.log("load more");
            fetchMore({
              variables: { skip: messages?.messages.length },
            });
          }}
          hasMore={
            messages && messagesCount
              ? messages.messages.length < messagesCount
              : false
          }
          useWindow={false}
        >
          {messages &&
            [...messages.messages]
              .sort((a, b) => {
                return (
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
                );
              })
              .map((message) => (
                <Grid
                  container
                  key={message._id}
                  alignItems={"center"}
                  marginBottom={"0.5rem"}
                >
                  <Grid item xs={2} md={1}>
                    <Avatar src="" sx={{ width: 30, height: 30 }} />
                  </Grid>
                  <Grid item xs={10} md={11}>
                    <Paper sx={{ width: "fit-content" }}>
                      <Typography sx={{ padding: "1rem" }}>
                        {message.content}
                      </Typography>
                    </Paper>
                    <Typography variant="caption">
                      {new Date(message.createdAt).toLocaleTimeString()} -{" "}
                      {new Date(message.createdAt).toLocaleDateString()}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
          <div ref={messagesEndRef} />
        </InfiniteScroll>
      </Box>
      {/* Message Bar */}
      <Paper
        sx={{
          p: "5px 15px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
        }}
      >
        <InputBase
          sx={{ flex: 1, width: "100%" }}
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreateMessage();
            }
          }}
        />
        <IconButton
          aria-label="send"
          onClick={() => {
            handleCreateMessage();
          }}
        >
          {/* Send Icon */}
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
