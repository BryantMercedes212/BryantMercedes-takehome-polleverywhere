import React from "react";
import "./Winners.css";

function Winners({ winner }) {
  return (
    <div key={winner.id} className="winnerContainer">
      <di className="winner">{winner.name}</di>
    </div>
  );
}

export default Winners;
