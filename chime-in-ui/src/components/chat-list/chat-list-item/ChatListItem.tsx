import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, ListItemButton } from "@mui/material";
import router from "../../auth/Routes";
import "./ChatListItem.css";

type ChatListItemProps = {
  name?: string | null;
  username?: string | null;
  _id: string;
  selected?: boolean;
  latestMessageContent?: string | null;
  imageUrl?: string | null;
};

const ChatListItem = ({
  username,
  name,
  _id,
  selected,
  latestMessageContent,
  imageUrl,
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
          <Avatar alt={`Profile Image of ${name}`} src={imageUrl ?? ""} />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexWrap: "wrap",
              }}
            >
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {username ?? ""}
              </Typography>
              <div className="content">
                {" " + (latestMessageContent ?? "")}
              </div>
            </Box>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default ChatListItem;
