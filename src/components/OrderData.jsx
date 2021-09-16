import React, { useEffect, useState } from "react";
import { Card, ListGroup, ListGroupItem, Form } from "react-bootstrap";


const OrderData = ({ products }) => {
  const [currentOrder, setCurrentOrder] = useState({});
  const {
    product
  } = products

}

//   return (
//     <Card
//       style={{ width: "18rem", marginBottom: "1rem" }}
//       key={`productId${productId}`}
//       ListIndex={index}
//     >
//       <Card.Img variant="top" src={product.imageurl} />
//       <Card.Body>
//         <Card.Title> {product.name}</Card.Title>
//         <Card.Subtitle>{product.artist}</Card.Subtitle>
//       </Card.Body>
//       <ListGroup>
//         <ListGroupItem> {product.category} </ListGroupItem>
//         <ListGroupItem> Price: {product.price} </ListGroupItem>
//         <ListGroupItem> Description: {product.description}</ListGroupItem>
//         <br />
//         {/* <AddToCartButton handleAddToCart={handleAddToCart} cart={cart} setCart={setCart} currentProduct={currentProduct} productId={productId} price={product.price} quant={quant} /> */}
//         <Form.Label> Change Quantity {quant} </Form.Label>
//         <Form.Range
//           min="0"
//           step="1"
//           max="10"
//           placeholder="0"
//           onChange={(e) => handleQuantity(e)}
//         />
//         <div>
//           <RemoveFromCartButton />
//         </div>
//       </ListGroup>
//     </Card>
//   );
// };

export default OrderData;
