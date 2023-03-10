import React from "react";
import input from "../input/input";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import "./AddNewParticipant.css";

function AddNewParticipant({ id, setAddNew, addNew, notify }) {
  const [newParticipant, setNewParticipant] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    raffle_id: Number(id),
  });

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
        "All required fields must filled in before trying to create a new participant "
      );
    } else {
      axios
        .post(`http://localhost:3333/raffle/${id}/participants`, {
          participant: newParticipant,
        })
        .then(() => {
          notify();
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

  return (
    <div className="newRaffleContainer">
      <div className="addNewRaffleTitle"> Adding a New Participant</div>
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

      <div className="participantsButtons">
        {" "}
        <Button
          sx={{
            height: 50,
            width: 150,
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
  );
}

export default AddNewParticipant;
