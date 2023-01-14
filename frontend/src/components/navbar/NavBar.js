import React from "react";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="navBarContainer">
      <div className="navBar">
        <div className="logo">Raffle App</div>
        <div className="navBarItems">
          <div>Home</div>
          <div>Create a New Raffle</div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
