import React, { useEffect, useState } from "react";

const OrderData = ({ id }) => {
  //const [singleOrder, setSingleOrder] = useState("");

  /*
  useEffect(() => {
    getOrderById(id)
      .then(setSingleOrder(order))
      .catch((error) => error);
  }, []);
};*/

  //const { id, status, userId, datePlaced, username } = singleOrder;

  return (
    <>
      <p>Order ID: </p>
      <p>Placed By: </p>
      <p>Status: </p>
      <p>Date Placed: </p>
    </>
  );
};
export default OrderData;
