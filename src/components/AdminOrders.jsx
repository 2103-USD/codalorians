import React, { useEffect, useState } from "react";
import { AdminOrderCard } from ".";
import { getAllOrders } from "./api";

const AdminOrders = (props) => {
    const [orderList, setOrderList] = useState([]);
    const { currentUser } = props;
  
    /*useEffect(() => {
      if (currentUser.isadmin)
        getAllOrders(currentUser)
          .then((data) => setOrderList(data))
          .catch((error) => console.error(error));
    }, []);*/

return (
    <div style={{ display: "flex", flexFlow: "row wrap" }}>
    <AdminOrderCard/>
    {/*orderList.map((order, index) => {
      return (
        <AdminOrdersCard
          key={order.id}
          order={order}
          index={index}
        />
      );
    })*/}
  </div>
)
}

export default AdminOrders