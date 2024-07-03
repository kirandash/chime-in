import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputBase,
  Modal,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
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
  const [isPrivate, setIsPrivate] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [createChat] = useCreateChat();

  const onModalClose = () => {
    setIsPrivate(false);
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
        <FormGroup>
          <FormControlLabel
            style={{ width: 0 }}
            control={
              <Switch
                defaultChecked={isPrivate}
                value={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
              />
            }
            label="Private"
          />
        </FormGroup>
        {isPrivate ? (
          <Paper sx={{ p: 1, mt: 2, display: "flex", alignItems: "center" }}>
            <InputBase placeholder="Enter user email" sx={{ ml: 1, flex: 1 }} />
            <IconButton>
              <PersonSearchIcon />
            </IconButton>
          </Paper>
        ) : (
          <TextField
            label="Chat Name"
            error={Boolean(error)}
            helperText={error}
            sx={{ mt: 2, width: "100%" }}
            onChange={(e) => setName(e.target.value)}
          />
        )}
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
                    isPrivate,
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
