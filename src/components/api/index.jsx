import axios from "axios";
const { API_URL } = process.env;

export async function getSomething() {
  try {
    const { data } = await axios.get("/api");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllProducts() {
  try {
    const { data } = await axios.get(`${API_URL}`)
    return data;
  } catch (error) {
    console.error(error)
  }
}

export const registerUser = async (username, password) => {
  try {
    
  } catch (error) {
    
  }
}

export const loginUser = async (username, password) => {
  try {
    
  } catch (error) {
    
  }
}

export const getOrders = async () => {
  try {
    
  } catch (error) {
    
  }
}

export const getProducts = async () => {
try {
  
} catch (error) {
  
}
}

export const getUser = async () => {
try {
  
} catch (error) {
  
}

}