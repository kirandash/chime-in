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

type ChatListConversationAddProps = {
  open: boolean;
  handleClose: () => void;
};

const ChatListConversationAdd = ({
  open,
  handleClose,
}: ChatListConversationAddProps) => {
  const [isPrivate, setIsPrivate] = useState(true);
  return (
    <Modal open={open} onClose={handleClose}>
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
                defaultChecked
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
          <TextField label="Chat Name" sx={{ mt: 2, width: "100%" }} />
        )}
        <Button variant="contained" sx={{ mt: 2 }} fullWidth>
          Add Chat
        </Button>
      </Box>
    </Modal>
  );
};

export default ChatListConversationAdd;
