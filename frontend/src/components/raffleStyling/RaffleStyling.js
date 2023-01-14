import React from "react";
import "./RaffleStyling.css";
import { useNavigate } from "react-router-dom";

function Raffle({ raffle }) {
  const navigate = useNavigate();
  return (
    <div className="raffleStylingContainer">
      <div
        className="raffleStylingInfo"
        onClick={() => navigate(`/${raffle.id}/raffle`)}
      >
        <div>{raffle.name}'s Raffle </div>
        <div>created on: lol</div>
        <div>Winner: 2</div>
        <div>Raffled on: loll</div>
      </div>
    </div>
  );
}

export default Raffle;
