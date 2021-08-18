import React, { useEffect } from "react";

const OrderData = ({ id }) => {
  const [singleOrder, setSingleOrder] = useState("");

  useEffect(() => {
    getOrderById(id)
      .then(setSingleOrder(order))
      .catch((error) => error);
  }, []);
};

const { id, status, userId, datePlaced, username } = singleOrder;

return (
  <>
    <p>Order ID: {id}</p>
    <p>Placed By: {username}</p>
    <p>Status: {status}</p>
    <p>Date Placed: {datePlaced} </p>
  </>
);

export default OrderData;
