import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

const PaginationComponent = (props) => {
  const [active, setActive] = useState(1);
  const { max, total, paginate } = props;
  const pages = [];
  for (let i = 1; i <= Math.ceil(total / max); i++) {
    pages.push(i);
  }

  return (
    <Pagination style={{ display: "flex", justifyContent: "center", marginTop:"10px" }}>
      {pages.map((num) => (
        <Pagination.Item
          key={num}
          active={num === active}
          onClick={(e) => {
            e.preventDefault();
            setActive(num);
            paginate(num);
            window.scrollTo(0, 0);
          }}
        >
          {num}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default PaginationComponent;
