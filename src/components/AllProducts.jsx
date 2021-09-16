import React from "react";
import { ProductCard } from "./";

const AllProducts = (props) => {


  const {currentUser, productList, cart, currentProduct, setCart, setCurrentProduct} = props

  console.log("This is productList=>", productList)
  return (
    <div style={{ display: "flex", flexFlow: "row wrap" }}>
      {productList.map((product, index) => {

        return <ProductCard product={product} index={index} setCart={setCart} cart={cart} setCurrentProduct={setCurrentProduct} currentProduct={currentProduct}/>;
      })}
    </div>
  );
};

export default AllProducts;
