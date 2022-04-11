import React from "react";
import { List, Paper } from "@mui/material";

import CommentItem from "./CommentItem";

function CommentList({
  items,
  onItemRemove,
  onItemReply,
  onItemEdit,
  onItemEnter,
  checkIsOriginator,
}) {
  return (
    <>
      {items.length > 0 && (
        <Paper style={{ margin: 16 }}>
          <List style={{ overflow: "scroll" }}>
            {items.map((item, idx) => (
              <CommentItem
                {...item}
                key={`Comment.${idx}`}
                divider={idx !== items.length - 1}
                onButtonDelete={() => onItemRemove(idx, item.COMMENT_ID)}
                onButtonReply={() => onItemReply(idx, item.COMMENT_ID)}
                onButtonEdit={() => onItemEdit(idx, item.COMMENT_ID)}
                onButtonEnter={() => onItemEnter(idx, item.COMMENT_ID)}
                checkIsOriginator={checkIsOriginator}
              />
            ))}
          </List>
        </Paper>
      )}
    </>
  );
}

export default CommentList;
