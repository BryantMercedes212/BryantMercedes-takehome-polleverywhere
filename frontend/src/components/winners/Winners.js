import React from "react";
import "./Winners.css";

function Winners({ winner }) {
  return (
    <div key={winner.id} className="winnerContainer">
      <div className="winner">
        <di className="winnerInfo">{winner.name}</di>
      </div>
    </div>
  );
}

export default Winners;
