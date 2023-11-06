import { useEffect, useState } from "react";
import getProducts, { IProduct } from "../actions/get-products";
import AddImageButton from "./AddImageButton";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    async function fetchData() {
      const { products } = await getProducts();
      setProducts(products);
    }

    fetchData();
  }, []);

  let content;
  if (products?.length === 0) {
    content = (
      <div className="col-span-full text-center bg-pink-200/40 px-4 py-4 md:py-8 rounded text-red-500 md:font-semibold">
        No products found
      </div>
    );
  }
  if (products?.length > 0) {
    content = products?.map((item) => (
      <ProductItem
        key={item._id}
        id={item._id}
        imageUrl={item.imageUrl}
        position={item.position}
      />
    ));
  }
  return (
    <div className="bg-white rounded-b px-8 md:px-12 py-4 md:py-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
      {content}
      <AddImageButton />
    </div>
  );
};

export default ProductList;
