import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Participant from "../participant/Participant";
import input from "../input/input";
import "./Raffle.css";
import { Button } from "@mui/material";

function Raffle() {
  const { id } = useParams();
  const [raffle, setRaffle] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [newParticipant, setNewParticipant] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    raffle_id: Number(id),
  });

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
    } catch (error) {
      console.log(error);
      setParticipants([]);
    }
  };

  useEffect(() => {
    fetchRaffle();
    fetchParticipants();
  }, []);

  useEffect(() => {
    fetchParticipants();
  }, [addNew]);

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;

    setNewParticipant({
      ...newParticipant,
      [name]: value,
    });
  };

  const createNewEntry = async () => {
    const { firstName, lastName, email } = newParticipant;

    //making sure that all the information thats needed to create a new entry is filled in
    if (firstName === "" || lastName === "" || email === "") {
      alert(
        "All required fields must filled in before trying to create a new Entry "
      );
    } else {
      axios
        .post(`http://localhost:3333/raffle/${id}/participants`, {
          participant: newParticipant,
        })
        .then(() => {
          setNewParticipant({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            raffle_id: Number(id),
          });

          setAddNew(false);
        });
    }
  };

  console.log(raffle, participants);

  return addNew ? (
    <div className="newEntryContainer">
      <div className="addNewEntryTitle"> Adding a New Entry</div>
      <div className="allInputs">
        {input(
          "First Name",
          "firstName",
          newParticipant.firstName,
          handleInputChange
        )}
        {input(
          "Last Name",
          "lastName",
          newParticipant.lastName,
          handleInputChange
        )}
        {input("Email", "email", newParticipant.email, handleInputChange)}
        {input("Phone", "phone", newParticipant.phone, handleInputChange)}
      </div>

      <div className="buttons">
        {" "}
        <Button
          sx={{
            height: 50,
          }}
          variant="contained"
          size="large"
          color="error"
          onClick={() => setAddNew(!addNew)}
        >
          Exit
        </Button>{" "}
        <Button
          sx={{
            height: 50,
          }}
          variant="contained"
          size="large"
          onClick={createNewEntry}
        >
          Add New Participant
        </Button>
      </div>
    </div>
  ) : (
    <div className="raffleContainer">
      <h1> {raffle.name}'s Raffle</h1>
      <div className="allParticipants">
        {" "}
        <div className="participantsContainer">
          <div className="addNewParticipant">
            <button onClick={() => setAddNew(!addNew)}>
              {" "}
              Add a new Participant
            </button>{" "}
          </div>

          {participants.map((participant) => {
            return <Participant participant={participant} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Raffle;
