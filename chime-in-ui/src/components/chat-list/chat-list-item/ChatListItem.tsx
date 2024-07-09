import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { ListItemButton } from "@mui/material";
import router from "../../auth/Routes";

type ChatListItemProps = {
  name?: string | null;
  username?: string | null;
  _id: string;
  selected?: boolean;
  latestMessageContent?: string | null;
};

const ChatListItem = ({
  username,
  name,
  _id,
  selected,
  latestMessageContent,
}: ChatListItemProps) => {
  return (
    <ListItem alignItems="flex-start" disablePadding>
      <ListItemButton
        onClick={() => {
          router.navigate(`/chats/${_id}`);
        }}
        selected={selected}
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {username ?? ""}
              </Typography>
              {" " + (latestMessageContent ?? "")}
            </React.Fragment>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default ChatListItem;
