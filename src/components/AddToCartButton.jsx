import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Cart } from ".";
import { createOrder, addProductToOrder, getProductById } from "./api/index";

import { getLocalCart, storeLocalCart } from "./auth/auth";

const AddToCartButton = (props) => {
  const {
    quant,
    setAddedToCart,
    productId,
    price,
    currentUser,
    setCurrentOrder,
    currentOrder,
    cart,
  } = props;

  const handleAddToCart = async (event) => {
    event.preventDefault();
    const id = productId;
    const quantity = quant;
    try {
      setAddedToCart(true);
      if (currentUser && !currentOrder) {
        const newOrder = await createOrder();
        setCurrentOrder(newOrder);
        const orderId = newOrder.Id;
        await addProductToOrder({ orderId, productId, price, quantity });
        // need to move select dropdown and connect value
      } else if (!currentUser) {
        //cart.products.push(currentProduct);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      block
      size="sm"
      name="AddToCart"
      type="Button"
      value="AddCart"
      className="m-1"
      onClick={handleAddToCart}
    >
      Add
    </Button>
  );
};

export default AddToCartButton;
