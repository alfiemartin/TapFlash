import React, { useState, createContext } from "react";
import uniqid from "uniqid";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [gameRunning, setRunning] = useState(false);
  const [userName, setUserName] = useState("guest");
  const [id, setID] = useState(uniqid("guest-"));
  const [showScores, setShowScores] = useState(false);
  const [email, setEmail] = useState(false);

  return (
    <GlobalContext.Provider
      value={[
        gameRunning,
        setRunning,
        userName,
        setUserName,
        id,
        setID,
        showScores,
        setShowScores,
        email,
        setEmail,
      ]}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
