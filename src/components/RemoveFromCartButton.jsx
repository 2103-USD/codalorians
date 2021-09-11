import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { getCart } from "./api/index";
import axios from "axios";

const RemoveFromCartButton = ({ setCart }) => {
  const handleRemoveFromCart = async (event) => {
    event.preventDefault();
    try {
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      block
      sz="sm"
      name="RemoveFromCart"
      type="Button"
      value="RemoveFromCart"
      className="m-1"
      onClick={handleRemoveFromCart}
    >
      Remove
    </Button>
  );
};

export default RemoveFromCartButton;
