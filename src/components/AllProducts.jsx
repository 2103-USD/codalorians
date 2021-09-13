import React from "react";
import { ProductCard } from "./";

const AllProducts = (props) => {


  const {productList, cart, currentProduct, setCart, setCurrentProduct} = props


  return (
    <div style={{ display: "flex", flexFlow: "row wrap" }}>
      {productList.map((product, index) => {

        return <ProductCard product={product} index={index} cart={cart} />;
      })}
    </div>
  );
};

export default AllProducts;
