import React from "react";
import { Carousel } from "react-bootstrap";
import { Product } from "./";

const Home = (props) => {
  const { productList } = props;
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
            <Carousel.Item interval={10000}>
              <img src={product.imageurl} alt={product.description} />
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
            <Carousel.Item interval={5000}>
              <Product
                ProductId={product.id}
                ListIndex={index}
                name={product.name}
                artist={product.artist}
                description={product.description}
                price={product.price}
                imageurl={product.imageurl}
                instock={product.instock}
                category={product.category}
                key={`productId${product.id}`}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
      <Carousel variant="dark" style={{ margin: "20px" }}>
        {list2.map((product, index) => {
          return (
            <Carousel.Item interval={5000}>
              <Product
                ProductId={product.id}
                ListIndex={index}
                name={product.name}
                artist={product.artist}
                description={product.description}
                price={product.price}
                imageurl={product.imageurl}
                instock={product.instock}
                category={product.category}
                key={`productId${product.id}`}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
};

export default Home;
