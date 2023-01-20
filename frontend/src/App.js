import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Raffle from "./components/raffle/Raffle";
import NavBar from "./components/navbar/NavBar";
import AddNewRaffle from "./components/addNewRaffle/AddNewRaffle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const notify = () => toast.success("Raffle Created!");

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home ToastContainer={ToastContainer} />}
        />
        <Route exact path="/:id/raffle" element={<Raffle />} />
        <Route
          exact
          path="/newraffle"
          element={<AddNewRaffle notify={notify} />}
        />
      </Routes>
    </div>
  );
}

export default App;
