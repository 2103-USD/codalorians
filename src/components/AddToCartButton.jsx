import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { createOrder, addProductToOrder, getProductById } from "./api/index";

import { getLocalCart, storeLocalCart } from "./auth/auth";

const AddToCartButton = ({
  quant,
  setAddedToCart,
  productId,
  price,
  currentUser,
  setCurrentOrder,
  currentOrder,
}) => {
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
        const currentCart = getLocalCart();
        const currentProduct = getProductById(id);
        currentCart.push(currentProduct);
        storeLocalCart(currentCart);
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
      onClick={handleAddToCart}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
