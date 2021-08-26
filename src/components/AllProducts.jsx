import React, { useState, useEffect } from "react";
import { getAllProducts } from "./api";
import Product from "./Product";

const AllProducts = () => {
  const [productList, setProductList] = useState([]);

  useEffect(
    () =>
      getAllProducts()
        .then(setProductList)
        .catch((error) => console.error(error)),
    []
  );

  return (
    <div>
      {productList.map((product, index) => {
        return (
          <Product
            ProductId={product.id}
            ListIndex={index}
            name={product.name}
            description={product.description}
            price={product.price}
            imageurl={product.imageurl}
            instock={product.instock}
            category={product.category}
          />
        );
      })}
    </div>
  );
};

export default AllProducts;
