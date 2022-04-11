import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Dashboard from "./Dashboard";
import Thread from "./Thread";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  // parent_comment_id
  const [mainChat, setMainChat] = useState({});

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo} />
      ) : (
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  setIsLoggedIn={setIsLoggedIn}
                  setUserInfo={setUserInfo}
                  userInfo={userInfo}
                  setMainChat={setMainChat}
                />
              }
            />
            <Route
              path="/thread"
              element={
                <Thread
                  mainChat={mainChat}
                  userInfo={userInfo}
                  setMainChat={setMainChat}
                />
              }
            />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
