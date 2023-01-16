import React from "react";
import "./RaffleStyling.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Raffle({ raffle }) {
  const navigate = useNavigate();
  const [winners, setWinners] = useState([]);
  console.log(raffle);

  const fetchWinners = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3333/raffle/${raffle.id}/winner`
      );
      setWinners(res.data);
    } catch (error) {
      console.log(error);
      setWinners([]);
    }
  };

  useEffect(() => {
    fetchWinners();
  }, []);

  return (
    <div className="raffleStylingContainer">
      <div
        className="raffleStylingInfo"
        onClick={() => navigate(`/${raffle.id}/raffle`)}
      >
        <div className="raffleOwner">
          {raffle.name[0].toUpperCase() + raffle.name.slice(1)}'s Raffle{" "}
        </div>
        <div>Created on: {raffle.created.slice(0, 25)}</div>
        <div>
          Winner:{" "}
          {winners.length > 0
            ? winners.map((winner) => {
                return <p>{winner.name}</p>;
              })
            : "No Winners Yet"}
        </div>
        <div>Raffled on: loll</div>
      </div>
    </div>
  );
}

export default Raffle;
