import { useState, useEffect, useRef } from "react";
import shuffle from "lodash/shuffle";
import Confetti from "react-confetti";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddNewParticipant from "../addNewParticipant/AddNewParticipant";
import Participant from "../participant/Participant";
import "./Raffle.css";

function Raffle() {
  const { id } = useParams();
  const [raffle, setRaffle] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);
  const [windowHeight, setWindowHeight] = useState(null);
  const [windowWidth, setWindowWidth] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [wraffling, setWraffling] = useState(false);
  const [winners, setWinners] = useState([]);
  const confettiWrapper = useRef(null);
  const [deleteParticipant, setDeleteParticipant] = useState(false);

  const fetchRaffle = async () => {
    try {
      const res = await axios.get(`http://localhost:3333/raffle/${id}`);
      setRaffle(res.data);
    } catch (error) {
      console.log(error);
      setRaffle([]);
    }
  };
  console.log(raffle);

  const fetchParticipants = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3333/raffle/${id}/participants`
      );
      setParticipants(res.data);
    } catch (error) {
      console.log(error);
      setParticipants([]);
    }
  };

  const fetchWinners = async () => {
    try {
      const res = await axios.get(`http://localhost:3333/raffle/${id}/winner`);
      setWinners(res.data);
    } catch (error) {
      console.log(error);
      setWinners([]);
    }
  };

  const updateParticipant = async () => {
    try {
      axios.post(`http://localhost:3333/raffle/update/winner`, {
        id: participants[0].id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const postWinner = async () => {
    try {
      axios.post(`http://localhost:3333/raffle/winner`, {
        winner: participants[0],
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(winners);

  function startRaffle() {
    if (participants.length <= 1) {
      setWraffling(true);
      setShowConfetti(true);
      postWinner();
      updateParticipant();
      return;
    }
    const randomIndex = Math.floor(Math.random() * participants.length);
    const filterOutNames = participants.filter(
      (participant) =>
        participant.firstname !== participants[randomIndex].firstname
    );
    setParticipants(filterOutNames);
    setInitialLoad(true);
  }

  useEffect(() => {
    fetchRaffle();
    fetchParticipants();
    fetchWinners();
  }, []);

  useEffect(() => {
    fetchParticipants();
  }, [addNew, deleteParticipant]);

  function restartRaffle() {
    setInitialLoad(false);
    fetchParticipants();
    setWraffling(false);
    setShowConfetti(false);
    fetchWinners();
  }

  useEffect(() => {
    if (initialLoad) {
      const filteringTimer = setTimeout(() => {
        startRaffle();
      }, 700);
      return () => {
        clearTimeout(filteringTimer);
      };
    }
  }, [initialLoad, participants, startRaffle]);

  useEffect(() => {
    setWindowHeight(confettiWrapper.current.clientHeight);
    setWindowWidth(confettiWrapper.current.clientWidth);
  }, []);

  return addNew ? (
    <AddNewParticipant setAddNew={setAddNew} addNew={addNew} />
  ) : (
    <div className="container" ref={confettiWrapper}>
      <h1>
        {" "}
        {raffle.name ? raffle.name[0].toUpperCase() + raffle.name.slice(1) : ""}
        's Raffle
      </h1>

      <div className="raffleHeader">
        <div></div>
        <div className="raffleButtons">
          {" "}
          <button className="buttonPrimary" onClick={startRaffle}>
            Start Raffle
          </button>
          <button
            className="button-outline"
            onClick={() => setParticipants(shuffle(participants))}
          >
            Shuffle
          </button>
        </div>
        <div>
          {" "}
          <button onClick={() => setAddNew(!addNew)}>
            {" "}
            Add a new Participant
          </button>{" "}
        </div>
      </div>
      <div className="raffleParticipants">
        {participants.map((participant, i) => {
          return (
            <Participant
              participant={participant}
              deleteParticipant={deleteParticipant}
              setDeleteParticipant={setDeleteParticipant}
            />
          );
        })}
      </div>
      {wraffling && (
        <Confetti
          recycle={showConfetti}
          numberOfPieces={80}
          width={windowWidth}
          height={1000}
        />
      )}

      <div>
        {showConfetti && (
          <div className="raffle-ends">
            <h3>Congratulations! You have won the raffle!</h3>
            <button className="button-outline" onClick={restartRaffle}>
              Replay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Raffle;
