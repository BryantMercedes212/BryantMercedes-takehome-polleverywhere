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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [objectOfNumbers, setObjectOfNumbers] = useState({});
  const [winner, setWinner] = useState({});
  const notify = () => toast.success("Participant Created!");

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

      setParticipants(res.data);
      const indexes = {};

      for (let i = 0; i < res.data.length; i++) {
        indexes[i] = false;
      }
      setObjectOfNumbers(indexes);
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
        id: winner.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const postWinner = async () => {
    try {
      axios.post(`http://localhost:3333/raffle/winner`, {
        winner: winner,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateRaffle = async () => {
    try {
      axios.put(`http://localhost:3333/raffle/${id}/update`);
    } catch (error) {
      console.log(error);
    }
  };

  function startRaffle() {
    const participantsWhoHaventLost = participants.filter(
      (participant) => participant.lost === false
    );
    if (participantsWhoHaventLost.length <= 1) {
      setWinner(participantsWhoHaventLost[0]);
      setWraffling(true);
      setShowConfetti(true);
      postWinner();
      updateParticipant();
      return;
    }
    const usableNumbers = [];
    for (let number in objectOfNumbers) {
      if (objectOfNumbers[number] === false) {
        usableNumbers.push(number);
      }
    }

    const randomIndex = Math.floor(Math.random() * usableNumbers.length);
    objectOfNumbers[usableNumbers[randomIndex]] = true;
    const temporaryParticipant = [...participants];
    temporaryParticipant[usableNumbers[randomIndex]].lost = true;
    setParticipants(temporaryParticipant);
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
      }, 1050);
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
    backgroundColor: "#448AFF",
    "&:hover": {
      backgroundColor: "#2196F3",
    },
  }));

  return addNew ? (
    <AddNewParticipant
      id={id}
      setAddNew={setAddNew}
      addNew={addNew}
      notify={notify}
    />
  ) : (
    <div className="container" ref={confettiWrapper}>
      <ToastContainer />
      <div className="raffleInformation">
        <div className="raffleName">
          {" "}
          {raffle.name
            ? raffle.name[0].toUpperCase() + raffle.name.slice(1)
            : ""}
          's Raffle
        </div>
        <PasswordModal
          open={open}
          handleClose={handleClose}
          password={password}
          setPassword={setPassword}
          checkPassword={checkPassword}
        />
        {allWinners.length >= 1 ? (
          <div className="winnerInfo">
            <div className="winnersContainer">
              {allWinners.length > 1 ? <h1> Winners: </h1> : <h1> Winner: </h1>}{" "}
              {allWinners.map((winner) => (
                <Winners winner={winner} />
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {participants.length > 0 ? (
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
      ) : (
        <div>
          <ColorButton variant="contained" onClick={() => setAddNew(!addNew)}>
            Add a new Participant
          </ColorButton>
        </div>
      )}{" "}
      {participants.length > 0 ? (
        <div className="raffleParticipantsContainer">
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
        </div>
      ) : (
        ""
      )}
      {wraffling && (
        <Confetti
          recycle={showConfetti}
          numberOfPieces={100}
          width={windowWidth}
          height={windowHeight}
        />
      )}
      {showConfetti && (
        <div className="raffleEndsContainer">
          <div className="raffleEnds">
            <div className="raffleEndsInformation">
              Congratulations {<span>{winner.firstname}</span>}! You have won
              the raffle!
            </div>

            <Button
              variant="contained"
              onClick={restartRaffle}
              size="large"
              sx={{
                height: 50,
                fontSize: "20px",
              }}
            >
              {" "}
              Reply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Raffle;
