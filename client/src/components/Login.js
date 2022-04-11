import React from "react";
import { useGoogleLogin } from "react-google-login";
import axios from "axios";

// refresh token
import { refreshTokenSetup } from "../utils/refreshTokenSetup";

const clientId =
  process.env.GOOGLE_CLIENT_ID ||
  "942316293034-t6d01jsotjv3hms5343iaehmg87av5cm.apps.googleusercontent.com";

function LoginHooks({ setIsLoggedIn, setUserInfo }) {
  const onSuccess = async (res) => {
    // console.log("Login Success: currentUser:", res);
    refreshTokenSetup(res);
    await axios
      .post("/api/login", {
        token: res.tokenId,
      })
      .then((response) => {
        setUserInfo({
          userId: response.data.userId,
          username: response.data.fullName,
          email: response.data.email,
        });
        setIsLoggedIn(true);
      });
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <button onClick={signIn} className="button">
      <img src="icons/google.svg" alt="google login" className="icon"></img>

      <span className="buttonText">Sign in with Google</span>
    </button>
  );
}

export default LoginHooks;
