import { useParams } from "react-router-dom";
import { useFindChatById } from "../../hooks/useFindChatById";
import { IconButton, InputBase, Paper, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Chat = () => {
  const params = useParams();
  if (!params._id) {
    throw new Error("Chat _id is required");
  }
  const { data } = useFindChatById({ _id: params._id });
  return (
    <Stack sx={{ height: "90vh", justifyContent: "space-between", p: "15px" }}>
      <h2>{data?.chat.name}</h2>
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
        />
        <IconButton aria-label="send">
          {/* Send Icon */}
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
