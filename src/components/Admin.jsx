import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Card,
  ListGroupItem,
  Accordion,
} from "react-bootstrap";
import { AllUsers } from "./";

const Admin = (product) => {
  const [showProductCreate, setShowProductCreate] = useState(false);
  const [showProductEdit, setShowProductEdit] = useState(false);
  const [showProductDelete, setShowProductDelete] = useState(false);
  const [selectedProduct, setShowSelectProduct] = useState({});

  return (
    <div className="Admin">
      <AllUsers />
    </div>
  );
};

export default Admin;
