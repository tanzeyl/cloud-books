import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserInfo from "./components/UserInfo";
import NoteState from "../src/context/notes/NoteState";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar title="CloudBooks" />
          <div className="container">
            <div style={{ height: "100px" }}>
              <Alert alert={alert} />
            </div>
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route
                exact
                path="/home"
                element={<Home showAlert={showAlert} />}
              />
              <Route exact path="/about" element={<About />} />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              />
              <Route exact path="/userInfo" element={<UserInfo />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
