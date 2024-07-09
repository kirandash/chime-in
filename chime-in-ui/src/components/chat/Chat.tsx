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
  const { data: messages } = useGetMessages({ chatId });
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
    setMessage("");
    scrollToBottom();
  }, [location, messages]);

  return (
    <Stack sx={{ height: "90vh", justifyContent: "space-between", p: "15px" }}>
      <h2>{data?.chat.name}</h2>
      <Box sx={{ maxHeight: "70vh", overflow: "scroll" }}>
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
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </Typography>
                </Grid>
              </Grid>
            ))}
        <div ref={messagesEndRef} />
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
