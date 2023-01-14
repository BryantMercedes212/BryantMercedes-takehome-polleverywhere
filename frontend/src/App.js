import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Raffle from "./components/raffle/Raffle";
import NavBar from "./components/navbar/NavBar";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/:id/raffle" element={<Raffle />} />
      </Routes>
    </div>
  );
}

export default App;
