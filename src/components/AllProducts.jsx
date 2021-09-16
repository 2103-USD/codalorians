import React, { useState } from "react";
import { ProductCard, PaginationComponent } from "./";

const AllProducts = (props) => {
  const { productList, cart } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(4);
  const totalProducts = productList.length;
  const lastProductIdx = currentPage * productsPerPage;
  const firstProductIdx = lastProductIdx - productsPerPage;
  const currentProducts = productList.slice(firstProductIdx, lastProductIdx);

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }


  const {currentUser, productList, cart, currentProduct, setCart, setCurrentProduct} = props

  console.log("This is productList=>", productList)
  return (
    <div style={{ display: "block" }}>
      <PaginationComponent
        max={productsPerPage}
        total={totalProducts}
        paginate={paginate}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          maxWidth: "100%",
          justifyContent: "space-around",
          padding: "1rem",
        }}
      >
        {currentProducts.map((product, index) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              cart={cart}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
