import { AppBar, IconButton, Toolbar } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

type ChatListHeaderProps = {
  handleAddChat: () => void;
};

const ChatListHeader = ({ handleAddChat }: ChatListHeaderProps) => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar disableGutters>
        <IconButton size="large" onClick={handleAddChat}>
          <AddCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default ChatListHeader;
