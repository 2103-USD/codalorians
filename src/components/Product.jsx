import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Product = ({
  productId,
  ListIndex,
  name,
  description,
  price,
  imageurl,
  instock,
  category,
}) => {
  return (
    <div key={productId} ListIndex={ListIndex}>
      <h1>
        Product Name: <NavLink to="/product/:productId"> {name} </NavLink>
      </h1>
      <img src={imageurl} />
      <h2>Price: {price}</h2>
      <category>{category}</category>
      {<h3>Availability: {instock ? true : false} </h3>}
      <p>Description: {description}</p>
    </div>
  );
};

export default Product;
