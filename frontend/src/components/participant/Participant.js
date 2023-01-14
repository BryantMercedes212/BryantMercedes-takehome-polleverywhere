import React from "react";
import "./Participant.css";
function Participant({ participant }) {
  return (
    <div className="participantContainer">
      <div className="participant">
        <div>
          {participant.firstname} {participant.lastname}
        </div>
      </div>
    </div>
  );
}

export default Participant;
