import React from "react";
import "./RaffleStyling.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";

function Raffle({ raffle }) {
  let formattedDateStarted = format(
    parseISO(raffle.created),
    "MM/dd/yyyy hh:mm aaaaa'm'"
  );

  let formattedDateRaffled = "";

  if (raffle.raffled !== null) {
    formattedDateRaffled = format(
      parseISO(raffle.raffled),
      "MM/dd/yyyy hh:mm aaaaa'm'"
    );
  }

  console.log(raffle.raffled);

  const navigate = useNavigate();
  const [winners, setWinners] = useState([]);

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
        <div>Created on: {formattedDateStarted}</div>
        <div>
          Winner:{" "}
          {winners.length > 0
            ? winners.map((winner) => {
                return <p>{winner.name}</p>;
              })
            : "No Winners Yet"}
        </div>
        <div>
          {" "}
          {raffle.raffled === null
            ? "Not Yet Raffled"
            : `Raffled on: ${formattedDateRaffled}`}
        </div>
      </div>
    </div>
  );
}

export default Raffle;
