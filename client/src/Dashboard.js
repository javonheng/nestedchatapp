import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardBox from "./components/DashboardBox";
import Logout from "./components/Logout";
import { Grid, Paper, TextField, Button } from "@mui/material/";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Dashboard({ setIsLoggedIn, setUserInfo, userInfo, setMainChat }) {
  const navigate = useNavigate();
  const [mainThreads, setMainThreads] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const getAllMainThreads = () => {
    axios
      .get("/api/comment/main")
      .then((res) => {
        setMainThreads(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllMainThreads();
  }, []);

  const submitNewComment = (e) => {
    e.preventDefault();

    let data = {
      userId: userInfo.userId,
      username: userInfo.username,
      desc: newComment,
      commentId: null,
      stage: null,
      isDeleted: false,
    };
    axios
      .post("/api/comment/", data)
      .then((response) => {
        getAllMainThreads();
      })
      .catch((err) => {
        console.log("err", err);
        setErrMsg(err.message);
      });
    if (errMsg !== "") {
      alert(errMsg);
    }
  };

  const handleJoin = (e, i) => {
    setMainChat(mainThreads[i]);
    navigate("/thread");
  };

  return (
    <div>
      <Logout
        setIsLoggedIn={setIsLoggedIn}
        setUserInfo={setUserInfo}
        userInfo={userInfo}
      />
      <br />

      <TextField
        id="outlined-basic"
        label="Comment"
        variant="outlined"
        onChange={(e) => setNewComment(e.target.value)}
        fullWidth="200px"
      />
      <Button variant="contained" onClick={submitNewComment}>
        + New Thread
      </Button>
      <br />

      <Grid container spacing={2}>
        {mainThreads &&
          mainThreads.map((thread, i) => {
            return (
              <Grid item xs={4}>
                <Item>
                  <DashboardBox
                    preheader={`Thread #${i + 1}`}
                    thread={thread}
                    index={i}
                    onClickJoin={handleJoin}
                  />
                </Item>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}

export default Dashboard;
