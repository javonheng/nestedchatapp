import React from "react";
import { useGoogleLogout } from "react-google-login";
import axios from "axios";

const clientId =
  process.env.GOOGLE_CLIENT_ID ||
  "942316293034-t6d01jsotjv3hms5343iaehmg87av5cm.apps.googleusercontent.com";

function LogoutHooks({ setIsLoggedIn, setUserInfo, userInfo }) {
  const onLogoutSuccess = async () => {
    await axios
      .post("/api/logout", {
        userId: userInfo.userId,
      })
      .then((response) => {
        setUserInfo(null);
        setIsLoggedIn(false);
      });
  };

  const onFailure = () => {
    console.log("Unable to Log out.");
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <button onClick={signOut} className="button">
      <img src="icons/google.svg" alt="google login" className="icon"></img>

      <span className="buttonText">Sign out</span>
    </button>
  );
}

export default LogoutHooks;
