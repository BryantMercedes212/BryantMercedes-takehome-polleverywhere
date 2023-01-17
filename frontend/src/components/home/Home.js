import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import RaffleStyling from "../raffleStyling/RaffleStyling";
import "./Home.css";

function Home() {
  const URL = process.env.REACT_APP_API_URL;
  const [allRaffles, setAllRaffles] = useState([]);

  const fetchAllRaffles = async () => {
    try {
      const res = await axios.get(`http://localhost:3333/raffle`);
      setAllRaffles(res.data.allRaffles);
    } catch (error) {
      console.log(error);
      setAllRaffles([]);
    }
  };

  useEffect(() => {
    fetchAllRaffles();
  }, []);

  return (
    <div className="allRafflesContainer">
      {/* <Roulette /> */}
      <div className="allRaffles">
        <div className="raffleTitle"> All Raffles:</div>
        <div className="raffles">
          {allRaffles.map((raffle) => {
            return <RaffleStyling raffle={raffle} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
