import React from "react";
const ScoreDisplay = (props) => {
  return (
    <div className="text-gray-300 p-4 text-2xl font-bold flex flex-col justify-center">
      <h1 className="">{props.time.toFixed(2)}s</h1>
    </div>
  );
};

export default ScoreDisplay;
