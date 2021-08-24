import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { getSomething } from "../api";
import { getCurrentUser } from "../auth";
import Modal from "./Modal";

const App = () => {
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    getSomething()
      .then((response) => {
        setMessage(response.message);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  });

  return (
    <div className="App">
      <Modal currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <h1>Hello, World!</h1>
      <h2>{message}</h2>
    </div>
  );
};

export default App;
