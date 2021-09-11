import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { getAllProducts, getUserCart } from "./api/index";
import {
  getCurrentUser,
  clearCurrentUser,
  storeCurrentUser,
} from "./auth/auth";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import NavBar from "./NavBar";
import Cart from "./Cart";
import AllProducts from "./AllProducts";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css";
import UserData from "./UserData";
import SideBar from "./SideBar";

const stripePromise = loadStripe(
  "pk_test_51JUj7UDh3o5GZx1A8vIc11Jk68TNGp67mAcT3Kq2n3tCUuzIt54R1M4rbqaKNP3FEU3tWJrV2QMPLpJURRRnSuET00IX4qh4Z2"
);

const App = () => {
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [orderCheckOut, setOrderCheckOut] = useState();
  const [cart, setCart] = useState([]);
  const [showSideBar, setToggleSideBar] = useState(false);

  useEffect( () => { try {
    const user = getCurrentUser();
    setCurrentUser(user)
  } catch (error) {
    console.error(error);
  }}, []);

  useEffect(
    () =>
      getAllProducts()
        .then((data) => setAllProducts(data))
        .catch((error) => console.error(error)),
    []
  );

  async function getCart(userOrStorage) {
    if (localStorage.getItem("cart")) {
      setCart(localStorage.getItem("cart"));
    } else {
      const cart = await getUserCart(currentUser.id);
      setCart(cart);
      localStorage.setItem("cart", cart);
    }
  }

  function toggleSideBar() {
    setToggleSideBar(!showSideBar);
  }

  function handleLogout() {
    clearCurrentUser();
    setCurrentUser("");
  }

  function handleRegister(user) {
    storeCurrentUser(user);
    setCurrentUser(user);
  }

  function handleLogin(user) {
    storeCurrentUser(user);
    setCurrentUser(user);
  }

  return (
    <Router>
      <NavBar
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        currentUser={currentUser}
        handleRegister={handleRegister}
      />
      <div className="App" style={{ position: "relative" }}>
        <SideBar
          currentUser={currentUser}
          toggleSideBar={toggleSideBar}
          showSideBar={showSideBar}
        />
        <Switch>
          <Route path={"/checkout"}>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                orderCheckOut={orderCheckOut}
                setOrderCheckOut={setOrderCheckOut}
              />
            </Elements>
          </Route>
          <Route path="/AllProducts">
            <AllProducts
              allProducts={allProducts}
              setCurrentProduct={setCurrentProduct}
            />
          </Route>
          <Route path="/Cart">
            <Cart currentUser={currentUser} />
          </Route>
          <Route path="/UserData">
            <UserData currentUser={currentUser} />
          </Route>
          <Route>
            <h1>404 Page Not Found</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
