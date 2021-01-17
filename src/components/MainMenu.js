import React, { useContext, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { provider } from "../firebase/config";
import firebase from "firebase/app";
import googleLogo from "../images/google-logo.png";

const colorCodeList = ["#F472B6", "#A78BFA", "#60A5FA", "#34D399", "#9CA3AF"];

const MainMenu = (props) => {
  const [
    gameRunning,
    setRunning,
    userName,
    setUserName,
    ,
    setID,
    ,
    setShowScores,
    ,
    setEmail,
  ] = useContext(GlobalContext);

  const [bgColor] = useState(
    colorCodeList[Math.floor(Math.random() * colorCodeList.length)]
  );

  const signIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        setUserName(user.displayName);
        setID(user.uid);
        props.setDP(user.photoURL);
        setEmail(user.email);
      })
      .catch((error) => {
        var errorCode = error.code;
        console.log(errorCode);
      });
  };

  //if already signed in
  firebase.auth().onAuthStateChanged((user) => {
    setUserName(user.displayName);
    setID(user.uid);
    props.setDP(user.photoURL);
    setEmail(user.email);
  });

  return (
    <>
      {!gameRunning && (
        <div
          style={{ background: bgColor }}
          className="main-menu w-full h-full flex-col overflow-hidden flex justify-center absolute z-20 px-2"
        >
          <div className="card w-full sm:w-3/5 lg:w-2/5 h-4/5 md:h-3/5 bg-pink-700 flex justify-start flex-col justify-around mx-auto z-20 items-center shadow-2xl rounded-2xl px-2 py-4 border-2">
            <div className="signed-in border-2 border-gray-800 logged-in-section bg-gray-300 p-4 my-4 rounded shadow grid grid-cols-3 justify-items-center">
              <img
                className="dp shadow-2xl flex-grow justify-self-start"
                src={props.dpAddress}
                alt="DP"
                width={50}
                height={50}
              />
              <h1 className="self-center text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 col-span-2 whitespace-nowrap">
                Signed in as {userName}
              </h1>
            </div>
            <h1 className="text-center text-5xl mb-16">Tap Flash</h1>
            <div className="buttons grid gap-4 grid-cols-2 ">
              <button
                className="bg-gray-700 text-gray-300 p-3 rounded shadow-xl mb-4 w-full text-base sm:text-lg md:text-xl lg:text-2xl transition transform hover:translate-y-0.5"
                onClick={() => {
                  setRunning(true);
                }}
              >
                Start
              </button>
              <button
                className="bg-gray-700 text-gray-300 p-3 rounded shadow-xl mb-4 w-full text-base sm:text-lg md:text-xl lg:text-2xl transition transform hover:translate-y-0.5"
                onClick={() => setShowScores(true)}
              >
                Leaderboards
              </button>
              <div
                className="google-sign-in cursor-pointer col-span-2 bg-gray-100 shadow p-3 text-2xl flex items-center rounded shadow-xl w-full transition transform hover:translate-y-0.5"
                onClick={() => (userName === "guest" ? signIn() : undefined)}
                style={{
                  filter: userName !== "guest" ? "grayscale(100)" : undefined,
                }}
              >
                <img
                  src={googleLogo}
                  width={30}
                  height={30}
                  alt="google logo"
                />
                <h1 className="font-roboto font-bold flex-grow text-center text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl">
                  Sign In With Google
                </h1>
              </div>
            </div>
            <h1 className="font-roboto text-center py-2">
              You must sign in to post your score to the leaderboards
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default MainMenu;
