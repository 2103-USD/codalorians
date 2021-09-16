import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { AllUsers, AdminProducts, AdminOrders} from "./";

const Admin = (props) => {
  const [showUsers, setShowUsers] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const { currentUser, productList } = props;
  function toggleShowUsers() {
    setShowUsers(!showUsers);
    setShowProducts(false);
    setShowOrders(false);
  }

  function toggleShowProducts() {
    setShowProducts(!showProducts);
    setShowOrders(false);
    setShowUsers(false);
  }

  function toggleShowOrders() {
    setShowOrders(!showOrders);
    setShowProducts(false);
    setShowUsers(false);
  }
  return (
    <div className="Admin">
      <ButtonGroup>
        <Button onClick={toggleShowUsers}>Users</Button>
        <Button onClick={toggleShowProducts}>Products</Button>
        <Button onClick={toggleShowOrders}>Orders</Button>
      </ButtonGroup>
      {showUsers ? <AllUsers currentUser={currentUser} /> : ""}
      {showProducts ? <AdminProducts productList={productList} /> : ""}
      {showOrders ? <AdminOrders currentUser={currentUser} /> : ""}
    </div>
  );
};

export default Admin;
