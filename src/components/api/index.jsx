import axios from "axios";

export async function getAllProducts() {
  try {
    const { data } = await axios.get(`/api/products`);
    console.log("This is from the api call:", data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const registerUser = async (username, password) => {
  try {
  } catch (error) {}
};

export const loginUser = async (username, password) => {
  try {
  } catch (error) {}
};

export const getOrders = async () => {
  try {
  } catch (error) {}
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
