import React, { useState } from "react";
import MainMenu from "./components/MainMenu";
import { GlobalProvider } from "./GlobalContext";
import Game from "./components/Game";
import Scores from "./components/Scores";
import guestImage from "./images/guest-user.jpg";

function App() {
  const [dpAddress, setDP] = useState(guestImage);
  return (
    <div className="fullscreen Wrapper w-screen h-screen">
      <GlobalProvider>
        <MainMenu setDP={setDP} dpAddress={dpAddress} />
        <Scores />
        <Game dpAddress={dpAddress} />
      </GlobalProvider>
    </div>
  );
}

export default App;
