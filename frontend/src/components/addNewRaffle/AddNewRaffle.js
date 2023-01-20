import input from "../input/input";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import "./AddNewRaffle.css";
import { useNavigate } from "react-router-dom";

function AddNewRaffle({ notify }) {
  const navigate = useNavigate();
  const [raffle, setRaffle] = useState({
    name: "",
    secret_key: "",
  });

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;

    setRaffle({
      ...raffle,
      [name]: value,
    });
  };

  const createNewEntry = async () => {
    const { name, secret_key } = raffle;

    //making sure that all the information thats needed to create a new entry is filled in
    if (name === "" || secret_key === "") {
      alert(
        "All required fields must filled in before trying to create a new raffle "
      );
    } else {
      axios
        .post(`http://localhost:3333/raffle`, {
          raffle: raffle,
        })
        .then(() => {
          setRaffle({
            name: "",
            secret_key: "",
          });
          notify();
          navigate(`/`);
        });
    }
  };

  return (
    <div className="newRaffleContainer">
      <div className="addNewRaffleTitle"> Add a New Raffle</div>
      <div className="allInputs">
        {input("Raffle Name", "name", raffle.name, handleInputChange)}
        {input("Password", "secret_key", raffle.secret_key, handleInputChange)}
      </div>

      <div className="buttons">
        {" "}
        <Button
          sx={{
            height: 50,
            width: 150,
          }}
          variant="contained"
          size="large"
          color="error"
          onClick={() => navigate(`/`)}
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
          Add New Raffle
        </Button>
      </div>
    </div>
  );
}

export default AddNewRaffle;
