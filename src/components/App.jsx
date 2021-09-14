import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  render,
} from "react-router-dom";

import { getAllProducts, getUser, getUserCart } from "./api/index";
import {
  getCurrentUser,
  clearCurrentUser,
  storeCurrentUser,
  getLocalCart,
  storeLocalCart,
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
  Admin,
  SideBar,
  Home,
} from "./";
const stripePromise = loadStripe(
  "pk_test_51JUj7UDh3o5GZx1A8vIc11Jk68TNGp67mAcT3Kq2n3tCUuzIt54R1M4rbqaKNP3FEU3tWJrV2QMPLpJURRRnSuET00IX4qh4Z2"
);

const App = () => {
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});
  const [orderCheckOut, setOrderCheckOut] = useState();
  const [cart, setCart] = useState({ products: [] });
  const [showSideBar, setToggleSideBar] = useState(false);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((data) => setProductList(data))
      .catch((error) => console.error(error));

    if (getCurrentUser()) {
      const { user } = getCurrentUser();
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    if (currentUser.id) {
      getUserCart(currentUser.id)
        .then((data) => setCart(data))
        .catch((error) => console.error(error));
    } else {
      getLocalCart();
    }
  }, []);

  useEffect(() => {
    if (!currentUser.id) {
      storeLocalCart(cart);
    }
  }, [cart]);

  function toggleSideBar() {
    setToggleSideBar(!showSideBar);
  }

  function handleLogout() {
    clearCurrentUser();
    setCurrentUser({});
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
            <Home productList={productList} cart={cart} />
          </Route>
          <Route path={"/Checkout"} component={Checkout}>
            <Checkout currentUser={currentUser} />
            <Elements stripe={stripePromise}>
              <CheckoutForm
                orderCheckOut={orderCheckOut}
                setOrderCheckOut={setOrderCheckOut}
              />
            </Elements>
          </Route>
          <Route exact path="/AllProducts" component={AllProducts}>
            <AllProducts
              cart={cart}
              productList={productList}
              setCurrentProduct={setCurrentProduct}
            />
          </Route>
          <Route exact path="/Admin" component={Admin}>
            <Admin />
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
