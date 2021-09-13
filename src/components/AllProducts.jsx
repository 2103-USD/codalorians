import React, { useState, useEffect } from "react";
import { getAllProducts } from "./api";
import Product from "./Product";

const AllProducts = (props) => {

  const {productList, cart, currentProduct, setCart, setCurrentProduct} = props

  return (
    <div style={{display:"flex", flexFlow:"row wrap"}}>
      {productList.map((product, index) => {
        return (
          <Product
            setCart={setCart}
            currentProduct={currentProduct}
            setCurrentProduct={setCurrentProduct}
            // productId={product.id}
            cart = {cart}
            ListIndex={index}
            // name={product.name}
            // artist={product.artist}
            // description={product.description}
            // price={product.price}
            // imageurl={product.imageurl}
            // instock={product.instock}
            // category={product.category}
            product={product}
            key={`productId${product.id}`}
          />
        );
      })}
    </div>
  );
};

export default AllProducts;
