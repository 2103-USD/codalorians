import React, { useState, useEffect } from "react";
import { getProducts } from "./api";
import Product from "./Product";
const AllProducts = () => {
  const [productList, setProduct] = useState([]);

  useEffect(
    () =>
      getAllProducts()
        .then(setProduct(product))
        .catch((error) => console.error(error)),
    productList
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
            imageUrl={product.imageUrl}
            inStock={inStock}
            category={category}
          />
        );
      })}
    </div>
  );
};

export default AllProducts;
