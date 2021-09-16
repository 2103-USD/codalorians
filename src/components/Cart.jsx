import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "./api";
import {Button, Nav} from "react-bootstrap";
import {OrderData, Checkout} from "./";
import { Card, ListGroup, ListGroupItem, Form } from "react-bootstrap";
import {
  getLocalCart,
} from "./auth/auth";
import { CartCard } from "./";







const Cart = ({ currentUser, setCart, cart, currentProduct, setCurrentProduct }) => {
  //const { id, username } = currentUser;
  // const [addedToCart, setAddedToCart] = useState(false);
  const [order, setOrder] = useState({});
  const [ordersList, setOrdersList] = useState([]);

  // const { 
  //   products
  // } = cart

//   return ordersList.length > 0 ? (
//     <div>
//       <h2>Your cart currently has {cart.length} items</h2>
//       {cart.map((products, index) => {
//         return <OrderData id={order.id} />;
//       })}
//     </div>
//   ) : (
//     <div>
//       <h2>Your Cart is Currently Empty</h2>
//       <Nav.Link as={Link} to={"/Checkout"}>
//       <Button>Checkout</Button>
//       </Nav.Link>
//     </div>
//   );
// };
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
    <br />
       <Nav.Link as={Link} to={"/Checkout"}>
       <Button>Checkout</Button>
       </Nav.Link>
    </div>
  
  </div>
  </>
);
};

export default Cart;
