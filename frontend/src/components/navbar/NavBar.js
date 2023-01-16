import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navBarContainer">
      <div className="navBar">
        <Link to="/">
          {" "}
          <div className="logo">The Raffle</div>
        </Link>

        <div className="navBarItems">
          <Link to="/">
            {" "}
            <div>Home</div>
          </Link>

          <Link to="/newraffle">
            {" "}
            <div>Create a New Raffle</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
