import React from "react";
import { TextField, Paper, Button, Grid } from "@mui/material";

function AddComment({ inputValue, onInputChange, onButtonClick }) {
  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Grid container>
        <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
          <TextField
            placeholder="Add Comment here"
            value={inputValue}
            onChange={onInputChange}
            fullWidth
          />
        </Grid>
        <Grid xs={2} md={1} item>
          <Button
            fullWidth
            color="secondary"
            variant="outlined"
            onClick={onButtonClick}
          >
            REPLY
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AddComment;
