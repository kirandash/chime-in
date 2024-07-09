import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";

import { useCreateChat } from "../../../hooks/useCreateChat";
import { UNKNOWN_ERROR_MESSAGE } from "../../../constants/errors";
import router from "../../auth/Routes";

type ChatListConversationAddProps = {
  open: boolean;
  handleClose: () => void;
};

const ChatListConversationAdd = ({
  open,
  handleClose,
}: ChatListConversationAddProps) => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [createChat] = useCreateChat();

  const onModalClose = () => {
    setError("");
    setName("");
    handleClose();
  };

  return (
    <Modal open={open} onClose={onModalClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Add Chat
        </Typography>
        <TextField
          label="Chat Name"
          error={Boolean(error)}
          helperText={error}
          sx={{ mt: 2, width: "100%" }}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          fullWidth
          onClick={async () => {
            if (!name.length) {
              setError("Chat name is required");
              return;
            }
            try {
              const chat = await createChat({
                variables: {
                  createChatInput: {
                    name: name ?? undefined,
                  },
                },
              });
              onModalClose();
              router.navigate(`/chats/${chat.data?.createChat._id}`);
            } catch (error) {
              setError(UNKNOWN_ERROR_MESSAGE);
            }
          }}
        >
          Add Chat
        </Button>
      </Box>
    </Modal>
  );
};

export default ChatListConversationAdd;
