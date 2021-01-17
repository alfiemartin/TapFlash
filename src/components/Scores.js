import React, { useContext } from "react";
import useFirestore from "../hooks/getMessages";
import { GlobalContext } from "../GlobalContext";

const Scores = () => {
  const { docs } = useFirestore("Scores");
  const [, , , , , , showScores, setShowScores] = useContext(GlobalContext);

  return (
    <>
      {showScores && (
        <div className="leaderboards w-full h-full flex-col flex justify-center absolute z-20 bg-gray-700 px-2">
          <div className="card w-full sm:w-3/5 lg:w-2/5 h-3/5 bg-pink-700 flex justify-start flex-col mx-auto items-end shadow-2xl rounded-2xl px-2 border-2 overflow-y-auto">
            <button
              className="w-24 rounded-b bg-gray-200 text-center self-center p-1 font-bold"
              onClick={() => setShowScores(false)}
            >
              X
            </button>
            {docs.map((doc) => {
              return (
                <div
                  key={doc.id}
                  className="w-full bg-gray-300 h-24 my-2 p-2 rounded flex items-center justify-between"
                >
                  <div>
                    <img
                      src={doc.dpAddress}
                      width={50}
                      height={50}
                      alt={"dp"}
                      className="dp"
                    ></img>
                    <h1 className="text-left block  font-roboto">
                      {doc.user_id}
                    </h1>
                  </div>
                  <div className="flex flex-col w-16 h-16 justify-center bg-blue-400 rounded-full">
                    <h1 className="text-center">{doc.score.toFixed(2)}s</h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Scores;
