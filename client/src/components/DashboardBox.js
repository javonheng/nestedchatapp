import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function DashboardBox({ preheader, thread, index, onClickJoin }) {
  const getDateTimeSg = (date) => {
    const event = new Date(date);
    return event.toString();
  };

  // console.log("Thread", thread);
  return (
    <Card sx={{ minWidth: 100 }} index={index}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {preheader}
        </Typography>

        <Typography variant="h5" component="div">
          {thread.DESCRIPTION}
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {getDateTimeSg(thread.createdAt)}
        </Typography>
        <Typography variant="body2">{thread.USERNAME}</Typography>
      </CardContent>
      <CardActions>
        <Button size="large" onClick={(e) => onClickJoin(e, index)}>
          JOIN
        </Button>
      </CardActions>
    </Card>
  );
}

export default DashboardBox;
