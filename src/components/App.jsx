import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { getAllProducts, getSomething } from "./api/index";
import { getCurrentUser } from "./auth/auth";

import Modal from "./Modal";

const App = () => {
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  return (
    <div className="App">
      <Modal currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <h1>Hello, World!</h1>
      <h2>{message}</h2>
    </div>
  );
};

export default App;
