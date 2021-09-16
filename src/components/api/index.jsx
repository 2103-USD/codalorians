import axios from "axios";

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
  username,
  password,
  isadmin
) => {
  try {
    const { data } = await axios.post("/api/users/register", {
      firstname,
      lastname,
      email,
      username,
      password,
      isadmin,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (username, password) => {
  try {
    const { data } = await axios.post("/api/users/login", {
      username,
      password,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserCart = async (userId) => {
  try {
    const { data } = await axios.get("/api/orders/cart", { userId });
    localStorage.setItem("cart", JSON.stringify(data.cart));
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getUsersList = async (currentUser) => {
  const { isadmin } = currentUser;
  try {
    const { data } = await axios.post("/api/users/all", { isadmin });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllOrders = async (currentUser) => {
  const { isadmin } = currentUser;
  try {
    const { data } = await axios.post("/api/orders/all", { isadmin });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getProducts = async () => {
  try {
  } catch (error) {}
};

export const getUser = async () => {
  try {
  } catch (error) {}
};

export async function createOrder() {
  try {
  } catch (error) {}
}

export async function addProductToOrder() {
  try {
  } catch (error) {}
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
    console.error(error);
  }
}
