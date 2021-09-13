import React, { useState } from "react";
import { Card, ListGroup, ListGroupItem, Form } from "react-bootstrap";
import AddToCartButton from "./AddToCartButton";
import RemoveFromCartButton from "./RemoveFromCartButton";
import { createOrder, addProductToOrder, getProductById } from "./api/index";
import {
  getCurrentUser,
  storeCurrentUser,
  getLocalCart,
  storeLocalCart,
} from "./auth/auth";


const Product = (props) => {
  const [quant, setQuant] = useState();
  const {
    productId,
    // artist,
    ListIndex,
    // name,
    // description,
    // price,
    // imageurl,
    // instock,
    // category,
    cart,
    currentProduct,
    setCart,
    currentUser,
    product,
    setCurrentProduct
  } = props;

  // move handleAddToCart here, then refactor product alone (or the components) here
  // pass setCurrentProduct = product thing im destructuring

  const handleAddToCart = async () => {
    // needs orderid
    // get cart passed down, cart.id is the order id now
    // then add product to order using that id
    console.log("this is the product=>", product)
    setCurrentProduct(product)
    console.log("clicked")
    console.log("This is currentUser =>",currentUser)
    console.log("This is cart =>",cart)
    console.log("This is currentProduct =>",currentProduct)
    const quantity = quant;
    const price = product.price
    try {
    //   setAddedToCart(true);
      if (currentUser) {
        let _cart;
        if (!cart.id) {
            _cart = await createOrder()
        } 
        await addProductToOrder({ orderId:_cart.id || cart.id, productId, price, quantity });
        setCart([...cart.products, currentProduct])
        console.log("This is the cart state =>", cart)
      } else if (!currentUser) {
        const currentCart = await getLocalCart()
        // const updatedCartList = [...cart.products, currentProduct]
        console.log("This is currentCart=>", currentCart)
        currentCart.products.push(currentProduct)
        //incorporate setCart and add updatedCartList
        // console.log("updatedCartList=>", updatedCartList)
        // storeLocalCart(cart); -> using same array as above
        // storeLocalCart([...cart.products, currentProduct])
        storeLocalCart(currentCart)
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleQuantity = (event) => {
    event.preventDefault();
    const productQuant = event.target.value;
    setQuant(productQuant);
  };

  return (
    <Card
      style={{ width: "18rem", marginBottom: "1rem" }}
      key={`productId${productId}`}
      ListIndex={ListIndex}
    >
      <Card.Img variant="top" src={product.imageurl} />
      <Card.Body>
        <Card.Title> {product.name}</Card.Title>
        <Card.Subtitle>{product.artist}</Card.Subtitle>
      </Card.Body>
      <ListGroup>
        <ListGroupItem> {product.category} </ListGroupItem>
        <ListGroupItem> Price: {product.price} </ListGroupItem>
        <ListGroupItem>
          {" "}
          Available: {product.instock ? "In Stock" : "Out of Stock"}{" "}
        </ListGroupItem>
        <ListGroupItem> Description: {product.description}</ListGroupItem>
        <br />
        <AddToCartButton handleAddToCart={handleAddToCart} cart={cart} setCart={setCart} currentProduct={currentProduct} productId={productId} price={product.price} quant={quant} />
        <Form.Label> Quantity {quant} </Form.Label>
        <Form.Range
          min="0"
          step="1"
          max="10"
          placeholder="0"
          onChange={(e) => handleQuantity(e)}
        />
        <div>
          <RemoveFromCartButton />
        </div>
      </ListGroup>
    </Card>
  );
};

export default Product;
