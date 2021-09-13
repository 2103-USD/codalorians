import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Cart } from ".";

import { getLocalCart, storeLocalCart } from "./auth/auth";

const AddToCartButton = (props) => {
  const {
  quant,
  setAddedToCart,
  productId,
  price,
  currentUser,
  setCart,
  cart,
  currentProduct,
  handleAddToCart
  } = props;


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
