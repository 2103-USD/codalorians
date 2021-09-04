import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

import { NavLink } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";
import RemoveFromCartButton from "./RemoveFromCartButton";

const Product = ({
  productId,
  ListIndex,
  name,
  description,
  price,
  imageurl,
  instock,
  category,
  currentUser,
}) => {
  const [quant, setQuant] = useState();

  const handleQuantity = async (event) => {
    event.preventDefault();
    const productQuant = event.target.value;
    setQuant(productQuant);
  };

  return (
    <div key={`productId${productId}`} ListIndex={ListIndex}>
      <h1>
        Product Name: <NavLink to="/product/:productId"> {name} </NavLink>
      </h1>
      <img src={imageurl} />
      <h2>Price: {price}</h2>
      <h2>{category}</h2>
      {<h3>Availability: {instock ? true : false} </h3>}
      <p>Description: {description}</p>
      <AddToCartButton productId={productId} price={price} quant={quant} />
      <br />
      Quantity:
      <select onChange={handleQuantity}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
      </select>
      <div>
        <RemoveFromCartButton />
      </div>
    </div>
  );
};

export default Product;
