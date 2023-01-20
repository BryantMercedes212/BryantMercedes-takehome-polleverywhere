import React from "react";
import "./Participant.css";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function Participant({ participant, deleteParticipant, setDeleteParticipant }) {
  const deleteAParticipant = async () => {
    try {
      axios.post(`http://localhost:3333/raffle/delete/participant`, {
        id: participant.id,
      });
      setDeleteParticipant(!deleteParticipant);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      key={participant.id}
      className={`${
        participant.lost ? "hiddenParticipant" : "activeParticipant"
      } participantContainer`}
    >
      <div className="participant">
        <di className="participantInfo">
          {participant.firstname} {participant.lastname}
        </di>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={deleteAParticipant}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
}

export default Participant;
