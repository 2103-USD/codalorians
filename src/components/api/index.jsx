import axios from "axios";
import { getCurrentUser } from "../auth/auth";

export async function getAllProducts() {
  try {
    const { data } = await axios.get(`/api/products`);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const registerUser = async (
  firstname,
  lastname,
  email,
  imageurl,
  username,
  password,
  isadmin
) => {
  try {
    const { data } = await axios.post("/api/users/register", {
      firstname,
      lastname,
      email,
      imageurl,
      username,
      password,
      isadmin,
    });
    localStorage.setItem("token", JSON.stringify(data.token));
    return data;
  } catch (error) {
    console.error(error)
  }
};

export const loginUser = async (username, password) => {
  try {
    const { data } = await axios.post("/api/users/login", {
      username,
      password,
    });
    localStorage.setItem("token", JSON.stringify(data.token));
    return data;
  } catch (error) {
    console.error(error)
  }
};

export const getUserCart = async (userId) => {
  try {
    const { data } = await axios.get("/api/orders/cart", {userId})
    localStorage.setItem("cart", JSON.stringify(data.cart));
    return data
  } catch (error) {
    console.error(error);
  }
};
// make sure we are getting status "created"

export const getUsersList = async () => {
  try {
    const user = await getCurrentUser();
    const { data } = await axios.get("/api/users", {user})
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const getProducts = async () => {
  try {
  } catch (error) {}
};

export const getUser = async () => {
  try {
  } catch (error) {}
};

export async function createOrder() {
  const status = "created"
  try {
    const {data: cart} = await axios.post("/api/orders", {
      status
    })
    return cart
  } catch (error) {
  console.error(error)
}
}

export async function addProductToOrder(productId, price, quantity) {
  try {
    const { data } = await axios.get("/api/orders/cart", {
      productId,
      price,
      quantity
    });
    return data;
  } catch (error) {
    console.error(error)
  }
}

export async function getProductById() {
  try {
  } catch (error) {}
}

export async function getOrderCart() {
  try {
    const { data } = await axios.get("/api/orders/cart");
    return data;
  } catch (error) {
    console.error(error)
  }
}
