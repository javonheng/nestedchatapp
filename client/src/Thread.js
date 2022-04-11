import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Paper, Button } from "@mui/material";
import axios from "axios";
import AddComment from "./components/AddComment";
import CommentList from "./components/CommentList";

function Thread({ mainChat, userInfo, setMainChat }) {
  const navigate = useNavigate();
  //   console.log("mainChat", mainChat);
  const [subThreads, setSubThreads] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [previousThread, setPreviousThread] = useState(null);

  const handleNewComment = (e) => {
    e.preventDefault();

    let data = {
      userId: userInfo.userId,
      username: userInfo.username,
      desc: inputValue,
      commentId: mainChat.COMMENT_ID,
      stage: mainChat.REF_COMMENT_STAGE_ID,
      isDeleted: false,
    };
    axios
      .post("/api/comment/", data)
      .then((response) => {
        getAllSubThreads(mainChat);
      })
      .catch((err) => {
        console.log("err", err);
        setErrMsg(err.message);
      });
    if (errMsg !== "") {
      alert(errMsg);
    }

    setInputValue("");
  };

  const getAllSubThreads = (mainChat) => {
    axios
      .get("/api/comment/sub?commentId=" + mainChat.COMMENT_ID)
      .then((res) => {
        setSubThreads([mainChat, ...res.data]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllSubThreads(mainChat);
  }, []);

  const deleteComment = (idx, id) => {
    axios
      .put("/api/comment/delete/" + id)
      .then((res) => {
        if (subThreads[idx].REF_COMMENT_STAGE_ID === 1) {
          navigate("/");
        } else {
          setSubThreads(subThreads.filter((_, index) => idx !== index));
        }
        // setSubThreads([mainChat, ...res.data]);
      })
      .catch((err) => console.log(err));
  };

  const updateComment = (idx, id) => {
    let data = {
      userId: userInfo.userId,
      username: userInfo.username,
      desc: inputValue,
      commentId: subThreads[idx].PARENT_COMMENT_ID
        ? subThreads[idx].PARENT_COMMENT_ID
        : null,
      stage: subThreads[idx].REF_COMMENT_STAGE_ID,
      isDeleted: false,
    };
    axios
      .put("/api/comment/" + id, data)
      .then((res) => {
        getAllSubThreads(mainChat);
      })
      .catch((err) => console.log(err));
    setInputValue("");
  };

  const replyComment = (idx, id) => {
    if (subThreads[idx].REF_COMMENT_STAGE_ID > 5) {
      alert("This Thread has reached it's limit.");
    } else {
      let data = {
        userId: userInfo.userId,
        username: userInfo.username,
        desc: inputValue,
        commentId: id,
        stage: subThreads[idx].REF_COMMENT_STAGE_ID,
        isDeleted: false,
      };
      axios
        .post("/api/comment/", data)
        .then((response) => {
          if (
            response.data.REF_COMMENT_STAGE_ID !==
            subThreads[idx].REF_COMMENT_STAGE_ID
          ) {
            setPreviousThread(subThreads[idx]);
            setMainChat(subThreads[idx]);
            getAllSubThreads(subThreads[idx]);
          } else {
            getAllSubThreads(mainChat);
          }
        })
        .catch((err) => {
          console.log("err", err);
          setErrMsg(err.message);
        });
      if (errMsg !== "") {
        alert(errMsg);
      }
    }

    setInputValue("");
  };

  const Back = () => {
    if (mainChat.REF_COMMENT_STAGE_ID === 1) {
      navigate("/");
    } else {
      findParentOfCurrentId(previousThread.PARENT_COMMENT_ID);
    }
  };

  const findParentOfCurrentId = (id) => {
    axios
      .get("/api/comment/findParentComment/" + id)
      .then((res) => {
        setPreviousThread(res.data);
        setMainChat(res.data);
        getAllSubThreads(res.data);
      })
      .catch((err) => console.log(err));
  };

  const enterComment = (idx, id) => {
    setPreviousThread(mainChat);
    setMainChat(subThreads[idx]);
    getAllSubThreads(subThreads[idx]);
  };

  const checkIsOriginator = (commentUser) => {
    if (userInfo.userId === commentUser) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Paper
        elevation={0}
        style={{ padding: 0, margin: 0, backgroundColor: "#fafafa" }}
      >
        <AppBar color="primary" position="static" style={{ height: 64 }}>
          <Toolbar style={{ height: 64 }}>
            <Typography color="inherit">{`Chat #${mainChat.COMMENT_ID}: ${mainChat.DESCRIPTION}`}</Typography>
          </Toolbar>
        </AppBar>
      </Paper>
      <AddComment
        inputValue={inputValue}
        onInputChange={(e) => setInputValue(e.target.value)}
        onButtonClick={(e) => handleNewComment(e)}
      />
      <CommentList
        items={subThreads}
        onItemRemove={deleteComment}
        onItemReply={replyComment}
        onItemEdit={updateComment}
        onItemEnter={enterComment}
        checkIsOriginator={checkIsOriginator}
      />

      {previousThread !== {} ? (
        <Button variant="contained" onClick={Back}>
          Back
        </Button>
      ) : (
        ""
      )}
    </>
  );
}

export default Thread;
