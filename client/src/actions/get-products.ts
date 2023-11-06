import axios from "../lib/axiosInstance";
export interface IProduct {
  _id: string;
  imageUrl: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}
const getProducts = async () => {
  try {
    const products: IProduct[] = (await axios.get("/")).data.images;

    return { isError: false, error: "", products: products };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log("ACTIONS/GET_PRODUCTS", err);
    return { isError: true, error: err.message, products: [] };
  }
};

export default getProducts;
