import React, { useEffect, useState } from 'react';
import {
  Container,
  Button,
  Card,
  ListGroupItem,
  Accordion,
} from 'react-bootstrap';

const Admin = () => {
    const [showProductCreate, setShowProductCreate] = useState(false);
    const [showProductEdit, setShowProductEdit] = useState(false);
    const [showProductDelete, setShowProductDelete] = useState(false);
    const [selectedProduct, setShowSelectProduct] = useState({})
}