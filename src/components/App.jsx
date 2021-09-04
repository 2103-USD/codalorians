import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { getAllProducts, getSomething } from "./api/index";
import { getCurrentUser } from "./auth/auth";
import NavBar from "./NavBar";
import Cart from "./Cart";
import AllProducts from "./AllProducts";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  return (
    <Router>
      <div className="App">
        <NavBar />
        <h1>Hello, World!</h1>
        <h2>{message}</h2>
        <Route path="/AllProducts">
          <AllProducts />
        </Route>
        <Route path="/Cart">
          <Cart currentUser={currentUser} />
        </Route>
      </div>
    </Router>
  );
};

export default App;
