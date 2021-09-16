import React, { useState } from "react";
import { AdminProductCard, PaginationComponent } from "./";

const AdminProducts = (props) => {
  const { productList } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(4);
  const totalProducts = productList.length;
  const lastProductIdx = currentPage * productsPerPage;
  const firstProductIdx = lastProductIdx - productsPerPage;
  const currentProducts = productList.slice(firstProductIdx, lastProductIdx);

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }

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
          flexFlow: "row no-wrap",
          maxWidth: "100%",
          justifyContent: "space-around",
          padding: "1rem",
        }}
      >
        {currentProducts.map((product, index) => {
          return (
            <AdminProductCard
              key={product.productId}
              product={product}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AdminProducts;
