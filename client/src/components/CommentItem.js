import React from "react";
import {
  ListItem,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";

function CommentItem({
  DESCRIPTION,
  USERNAME,
  USER_ID,
  divider,
  onButtonDelete,
  onButtonReply,
  onButtonEdit,
  onButtonEnter,
  checkIsOriginator,
}) {
  return (
    <ListItem divider={divider}>
      <ListItemText primary={USERNAME} secondary={DESCRIPTION} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Enter Comment" onClick={onButtonEnter}>
          Enter
        </IconButton>
        {checkIsOriginator(USER_ID) && (
          <IconButton aria-label="Delete Comment" onClick={onButtonEdit}>
            Edit
          </IconButton>
        )}
        {checkIsOriginator(USER_ID) && (
          <IconButton aria-label="Delete Comment" onClick={onButtonDelete}>
            Delete
          </IconButton>
        )}
        <IconButton aria-label="Delete Comment" onClick={onButtonReply}>
          Reply
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default CommentItem;
