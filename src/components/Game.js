import PoissonDiskSampling from "poisson-disk-sampling";
import React, { useState, useEffect, useContext, useRef } from "react";
import ScoreDisplay from "./ScoreDisplay";
import { GlobalContext } from "../GlobalContext";
import { projectFirestore, timestamp } from "../firebase/config";

import useSound from "use-sound";
import clickSound from "../audio/clickSound.mp3";

function Game({ dpAddress }) {
  const [currentMap, setMap] = useState([[0], [0]]);
  const [colorsArray, updateColorsArray] = useState([]);
  const [nextToPress, updateTarget] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const viewportRef = useRef();

  const [playClickSound] = useSound(clickSound);

  const colorCodeList = ["#F472B6", "#A78BFA", "#60A5FA", "#34D399", "#9CA3AF"];
  const NUMBUTTS = 20;

  const [gameRunning, setRunning, userName, , id, , , , email] = useContext(
    GlobalContext
  );

  const getNewPoints = ({ x, y }) => {
    let p = new PoissonDiskSampling({
      shape: [x - 70, y - 200],
      minDistance: window.innerWidth <= 1280 ? 50 : 120,
      maxDistance: window.innerWidth <= 1280 ? 70 : 150,
      tries: 10,
    });

    let points = p.fill();
    let smaller = [];
    for (let i = 0; i < NUMBUTTS; i++) {
      var notUnique = true;
      while (notUnique) {
        let newRandPoint = points[Math.floor(Math.random() * points.length)];
        if (smaller.includes(newRandPoint)) {
          notUnique = true;
        } else {
          smaller.push(newRandPoint);
          notUnique = false;
        }
      }
    }
    setMap(smaller);
  };

  const inititalColor = () => {
    let colors = new Array(NUMBUTTS).fill("#F87171");
    colors[0] = colorCodeList[Math.floor(Math.random() * colorCodeList.length)];
    updateColorsArray(colors);
  };

  const startGame = () => {
    getNewPoints({
      x: viewportRef.current.offsetWidth,
      y: viewportRef.current.offsetHeight,
    });
    inititalColor();
    setTimeElapsed(0);
    updateTarget(0);
  };

  const flashColors = (delay) => {
    let currentColors = colorsArray;
    let flashColors = [];

    currentColors.forEach(() => {
      flashColors.push(
        colorCodeList[Math.floor(Math.random() * colorCodeList.length)]
      );
    });

    return new Promise((res) => {
      updateColorsArray(flashColors);
      setTimeout(() => {
        updateColorsArray(currentColors);
        setTimeout(() => {
          updateColorsArray(flashColors);
          setTimeout(() => {
            updateColorsArray(currentColors);
            setTimeout(() => {
              updateColorsArray(flashColors);
              setTimeout(() => {
                updateColorsArray(currentColors);
                res();
              }, delay);
            }, delay);
          }, delay);
        }, delay);
      }, delay);
    });
  };

  const handleCircleClick = (e) => {
    let circleList = document.querySelectorAll(".circle");
    let currentColors = colorsArray;

    if (e.target === circleList[nextToPress]) {
      currentColors[nextToPress + 1] =
        colorCodeList[Math.floor(Math.random() * colorCodeList.length)];
      updateTarget(nextToPress + 1);
      flashColors(200).then(() => updateColorsArray(currentColors));
    } else {
      setRunning(false);
      setTimeout(() => {
        setRunning(true);
      }, 200);
    }
  };

  //timer state updator
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimeElapsed(timeElapsed + 0.01);
    }, 10);
    return () => clearTimeout(timeout);
  });

  //game completed
  useEffect(() => {
    const gameCompleted = () => {
      console.log("Game Complete");
      setRunning(false);

      const docRef = projectFirestore.collection("Scores").doc(id);

      docRef.set({
        score: timeElapsed,
        date: timestamp(),
        user_id: userName,
        dpAddress: dpAddress,
        uid: id,
        email: email,
      });
    };

    if (nextToPress === NUMBUTTS) {
      gameCompleted();
      updateTarget(0);
    }
  }, [nextToPress, setRunning, id, userName, timeElapsed, dpAddress, email]);

  //start game
  useEffect(() => {
    if (gameRunning) {
      startGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameRunning]);

  return (
    <div className="w-screen h-screen relative bg-gradient-to-t from-indigo-700 to-blue-800">
      <div className="w-full h-1/6 flex justify-between flex-row-reverse">
        <button
          className="p-4 font-bold text-gray-200"
          onClick={() => setRunning(false)}
          style={{ left: "calc(100% - 200px)" }}
        >
          Quit Game
        </button>
        <ScoreDisplay score={nextToPress} time={timeElapsed} />
      </div>
      <div
        className="game-cont w-full md:w-2/3 h-5/6 md:mx-auto relative"
        ref={viewportRef}
      >
        {currentMap.map((point, index) => {
          return (
            <div
              className={`circle-${index} circle w-10 h-10 xl:w-20 xl:h-20 absolute rounded-xl shadow-xl cursor-pointer outline-none transition transform  hover:scale-90`}
              key={index}
              style={{
                left: point[0],
                top: point[1],
                backgroundColor: colorsArray[index],
              }}
              onClick={(e) => {
                handleCircleClick(e);
                playClickSound();
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default Game;
