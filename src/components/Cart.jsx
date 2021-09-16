import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "./api";
import {Button, Nav} from "react-bootstrap";
import {OrderData, Checkout} from "./";
import {
  getLocalCart
} from "./auth/auth";
import { CartCard } from "./";




const Cart = ({ currentUser, setCart, cart, currentProduct, setCurrentProduct }) => {



const currentCart = getLocalCart()

return (
  <>
  <div style={{display: "block"}}>
        Your Cart:
  
  <div style={{ display: "flex", flexFlow: "row wrap" }}>
    <br />
    {currentCart.products.map((product, index) => {

      return <CartCard product={product} index={index} setCart={setCart} cart={cart} setCurrentProduct={setCurrentProduct} currentProduct={currentProduct}/>;
    })}
    </div>
    <div>

      <h2>Your Cart is Currently Empty</h2>
      <Nav.Link as={Link} to={"/Checkout"}>
        <Button>Checkout</Button>
      </Nav.Link>

    </div>
  
  </div>
  </>
);
};

export default Cart;
