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
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css";

import {
  Checkout,
  CheckoutForm,
  NavBar,
  Cart,
  AllProducts,
  UserData,
  SideBar,
  Home,
} from "./";

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
  const [productList, setProductList] = useState([]);

  useEffect(
    () =>
      getAllProducts()
        .then((data) => setProductList(data))
        .catch((error) => console.error(error)),
    []
  );

  useEffect(() => {
    try {
      const user = getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error(error);
    }
  }, []);

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
      <div
        className="App"
        style={{ display: "flex", position: "relative", paddingLeft: "300px" }}
      >
        <SideBar
          toggleSideBar={toggleSideBar}
          showSideBar={showSideBar}
          currentUser={currentUser ? currentUser : ""}
        />
        <Switch>
          <Route exact path={"/"} component={Home}>
            <Home productList={productList} />
          </Route>
          <Route
            path={"/Checkout"}
            component={Checkout}
            currentUser={currentUser}
          >
            <Checkout>
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  orderCheckOut={orderCheckOut}
                  setOrderCheckOut={setOrderCheckOut}
                />
              </Elements>
            </Checkout>
          </Route>
          <Route exact path="/AllProducts" component={AllProducts}>
            <AllProducts
              productList={productList}
              setCurrentProduct={setCurrentProduct}
            />
          </Route>
          <Route exact path="/Cart" component={Cart}>
            <Cart />
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
