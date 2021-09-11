import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { getAllProducts, getSomething } from "./api/index";
import {
  getCurrentUser,
  clearCurrentUser,
  storeCurrentUser,
} from "./auth/auth";
import NavBar from "./NavBar";
import Cart from "./Cart";
import AllProducts from "./AllProducts";
import "bootstrap/dist/css/bootstrap.min.css";
import UserData from "./UserData";
import Checkout from "./Checkout";

const App = () => {
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    clearCurrentUser();
    setCurrentUser("");
  };

  async function handleLogin({ user }) {
    await storeCurrentUser(user);
    await setCurrentUser(user);
  }

  return (
    <Router>
      <div className="App">
        <NavBar
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          currentUser={currentUser}
        />
        <h1>Hello, World!</h1>
        <h2>{message}</h2>
        <Route path="/AllProducts">
          <AllProducts />
        </Route>
        <Route path="/Cart">
          <Cart currentUser={currentUser} />
        </Route>
        <Route path="/UserData">
          <UserData currentUser={currentUser} />
        </Route>
        <Route path="/Checkout">
          <Checkout currentUser={currentUser} />
        </Route>
      </div>
    </Router>
  );
};

export default App;
