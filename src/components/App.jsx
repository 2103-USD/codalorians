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
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css";

import {
  Footer,
  Checkout,
  UserData,
  NavBar,
  Cart,
  AllProducts,
  Admin,
  SideBar,
  Home,
} from "./";


const App = () => {
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState({});
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

  function handleAddProduct(product) {
    setCart(product)
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
        style={{ display: "flex", position: "relative", height: "100vh", width: "80vw", paddingLeft: "300px" }}
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
            <Checkout currentUser={currentUser}/>
          </Route>
          <Route exact path="/AllProducts" component={AllProducts}>
            <AllProducts
              setCart={setCart}
              cart={cart}
              productList={productList}
              setCurrentProduct={setCurrentProduct}
              currentProduct={currentProduct}
              handleAddProduct={handleAddProduct}
              currentUser={currentUser}
            />
          </Route>
          <Route exact path="/Admin" component={Admin}>
            <Admin productList={productList} currentUser={currentUser} />
          </Route>
          <Route exact path="/Cart" component={Cart}>
            <Cart setCart={setCart} cart={cart} currentUser={currentUser} currentProduct={currentProduct} setCurrentProduct={setCurrentProduct}/>
          </Route>
          <Route exact path="/UserData" component={UserData}>
            <UserData currentUser={currentUser}/>
          </Route>
          <Route>
            <h1>404 Page Not Found</h1>
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
