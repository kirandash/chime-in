import { AppBar, IconButton, Toolbar } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const ChatListHeader = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar disableGutters>
        <IconButton size="large">
          <AddCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default ChatListHeader;
