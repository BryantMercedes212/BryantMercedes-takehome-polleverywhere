import React from "react";
import "./Participant.css";
import axios from "axios";

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
    <div key={participant.id} className="participantContainer">
      <div className="participant">
        <di className="participantInfo">
          {participant.firstname} {participant.lastname}
        </di>
        <div className="delete" onClick={deleteAParticipant}>
          {" "}
          x
        </div>
      </div>
    </div>
  );
}

export default Participant;
