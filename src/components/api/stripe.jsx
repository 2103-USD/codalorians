import axios from "axios";

export const sendStripePayment = async (options) => {
  const { orderCheckOut, id } = options;
  try {
    const { data } = await axios.post("/api/stripe/pay", {
      id,
      orderCheckOut,
    });
    if (data.error) {
      throw Error({ name: "PaymentError", Message: "Error sending payment." });
    } else {
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};
