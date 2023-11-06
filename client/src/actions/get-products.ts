import axios from "../lib/axiosInstance";

const getProducts = async () => {
  let error,
    products,
    isError = false;
  try {
    products = await axios.get("/");
  } catch (err) {
    console.log("ACTIONS/GET_PRODUCTS", err);
    error = err;
    isError = true;
  }

  return { isError, error, products };
};

export default getProducts;
