import React, { useState, useEffect } from "react";
import { getAllProducts } from "./api";
import Product from "./Product";

const AllProducts = () => {
  const [productList, setProductList] = useState([]);

  useEffect(
    () =>
      getAllProducts()
        .then((data) => setProductList(data))
        .catch((error) => console.error(error)),
    []
  );

  return (
    <div style={{display:"flex", flexFlow:"row wrap", paddingLeft:"300px"}}>
      {productList.map((product, index) => {
        return (
          <Product
            ProductId={product.id}
            ListIndex={index}
            name={product.name}
            artist={product.artist}
            description={product.description}
            price={product.price}
            imageurl={product.imageurl}
            instock={product.instock}
            category={product.category}
            key={`productId${product.id}`}
          />
        );
      })}
    </div>
  );
};

export default AllProducts;
