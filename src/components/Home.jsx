import React from "react";
import { Carousel } from "react-bootstrap";
import { ProductCard } from "./";

const Home = (props) => {
  const { productList, cart } = props;
  const half = Math.ceil(productList.length / 2);
  const list1 = productList.slice(0, half);
  const list2 = productList.slice(-half);
  const reverseProductList = productList.reverse();
  return (
    <>
      <Carousel
        variant="dark"
        style={{ marginTop: "20px", marginRight: "50px" }}
      >
        {reverseProductList.map((product) => {
          return (
            <Carousel.Item key={product.id} interval={10000}>
              <img
                key={product.id}
                src={product.imageurl}
                alt={product.description}
              />
              <Carousel.Caption>
                <h3>{product.name}</h3>
                <p>{product.artist}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
      <Carousel variant="dark" style={{ margin: "20px" }}>
        {list1.map((product, index) => {
          return (
            <Carousel.Item key={product.id} interval={5000}>
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                cart={cart}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
      <Carousel variant="dark" style={{ margin: "20px" }}>
        {list2.map((product, index) => {
          return (
            <Carousel.Item key={product.id} interval={5000}>
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                cart={cart}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
};

export default Home;
