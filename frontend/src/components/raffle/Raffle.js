import { useState, useEffect, useRef } from "react";
import shuffle from "lodash/shuffle";
import Confetti from "react-confetti";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddNewParticipant from "../addNewParticipant/AddNewParticipant";
import Participant from "../participant/Participant";
import "./Raffle.css";
import { Button } from "@mui/material";
import PasswordModal from "../passwordModal/PasswordModal";
import { styled } from "@mui/material/styles";
import Winners from "../winners/Winners";

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
  const [allWinners, setAllWinners] = useState([]);
  const confettiWrapper = useRef(null);
  const [deleteParticipant, setDeleteParticipant] = useState(false);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [arrayOfNumbers, setArrayOfNumbers] = useState({});
  const [winner, setWinner] = useState({});

  const fetchRaffle = async () => {
    try {
      const res = await axios.get(`http://localhost:3333/raffle/${id}`);
      setRaffle(res.data);
    } catch (error) {
      console.log(error);
      setRaffle([]);
    }
  };

  const fetchParticipants = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3333/raffle/${id}/participants`
      );
      const editedParticipant = res.data.map((participant) => {
        participant.lost = false;
        return participant;
      });
      setParticipants(editedParticipant);
      const indexes = {};
      for (let i = 0; i < editedParticipant.length; i++) {
        indexes[i] = false;
      }
      setArrayOfNumbers(indexes);
    } catch (error) {
      console.log(error);
      setParticipants([]);
    }
  };

  const fetchWinners = async () => {
    try {
      const res = await axios.get(`http://localhost:3333/raffle/${id}/winner`);
      setAllWinners(res.data);
    } catch (error) {
      console.log(error);
      setAllWinners([]);
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

  const updateRaffle = async () => {
    try {
      axios.post(`http://localhost:3333/raffle/${id}/update`);
    } catch (error) {
      console.log(error);
    }
  };

  function startRaffle() {
    if (
      participants.filter((participant) => participant.lost === false).length <=
      1
    ) {
      setWinner(
        participants.filter((participant) => participant.lost === false)
      );

      setWraffling(true);
      setShowConfetti(true);
      postWinner();
      updateParticipant();
      return;
    }
    const arr = [];
    for (let key in arrayOfNumbers) {
      if (arrayOfNumbers[key] === false) {
        arr.push(key);
      }
    }

    const randomIndex = Math.floor(Math.random() * arr.length);
    arrayOfNumbers[arr[randomIndex]] = true;

    console.log(arr);
    // const filterOutNames = participants.filter(
    //   (participant) => participant.lost === true
    // );
    // setParticipants(filterOutNames);
    const temporaryParticipant = [...participants];
    temporaryParticipant[arr[randomIndex]].lost = true;
    console.log("deleted", randomIndex);
    // const tempArray = [...arrayOfNumbers];
    // tempArray.splice(randomIndex, 1);

    setParticipants(temporaryParticipant);
    // setArrayOfNumbers(tempArray);
    setInitialLoad(true);
  }
  console.log(arrayOfNumbers);

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

  const checkPassword = () => {
    if (password !== raffle.secret_key) {
      alert("Incorrect Password");
    } else {
      handleClose();
      startRaffle();
      updateRaffle();
    }
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: "rgb(241, 250, 238)",
    backgroundColor: "rgb(69, 123, 157)",
    "&:hover": {
      backgroundColor: "rgb(29, 53, 87)",
    },
  }));

  return addNew ? (
    <AddNewParticipant setAddNew={setAddNew} addNew={addNew} />
  ) : (
    <div className="container" ref={confettiWrapper}>
      <h1>
        {" "}
        {raffle.name ? raffle.name[0].toUpperCase() + raffle.name.slice(1) : ""}
        's Raffle
      </h1>

      <PasswordModal
        open={open}
        handleClose={handleClose}
        password={password}
        setPassword={setPassword}
        checkPassword={checkPassword}
      />

      <div className="raffleHeader">
        <div></div>
        <div className="raffleButtons">
          {" "}
          <ColorButton variant="contained" onClick={handleOpen}>
            Start Raffle
          </ColorButton>
          <ColorButton
            variant="contained"
            onClick={() => setParticipants(shuffle(participants))}
          >
            Shuffle Participants
          </ColorButton>
        </div>

        <div>
          <ColorButton variant="contained" onClick={() => setAddNew(!addNew)}>
            Add a new Participant
          </ColorButton>
        </div>
      </div>

      {allWinners.length >= 1 ? (
        <div className="winnerInfo">
          <h1> Winners</h1>
          <div className="winnersContainer">
            {allWinners.map((winner) => (
              <Winners winner={winner} />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="raffleParticipants">
        {participants.map((participant, i) => {
          return (
            <Participant
              participant={participant}
              deleteParticipant={deleteParticipant}
              setDeleteParticipant={setDeleteParticipant}
              lost={false}
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
            <h3>
              Congratulations {winner[0].firstname}! You have won the raffle!
            </h3>
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
