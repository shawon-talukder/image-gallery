import useStore from "../hooks/useStore";

interface ProductItemType {
  id: string;
  imageUrl: string;
  position: number;
}

const ProductItem = ({ id, imageUrl, position }: ProductItemType) => {
  const { checkedImg, removeCheckedImg, updateCheckedImg } = useStore();

  const handleCheck = () => {
    if (checkedImg.includes(id)) {
      removeCheckedImg(id);
    } else {
      updateCheckedImg(id);
    }
  };

  const checkedOnLeftTop = checkedImg.includes(id) && (
    <input
      className={`absolute top-2 left-2 bg-green-200 group-hover:hidden ${
        position === 1 ? "w-6 h-6" : "w-4 h-4"
      }`}
      type="checkbox"
      defaultChecked={checkedImg.includes(id)}
    />
  );
  return (
    <div
      className={`${
        position === 1
          ? "col-span-2 row-span-2 min-h-[200px]"
          : "col-span-1 min-h-[100px]"
      } group bg-gray-500/20 flex justify-center items-center rounded relative hover:opacity-70 cursor-pointer`}
    >
      {checkedOnLeftTop}
      <img
        className={`object-contain w-3/4 ${position === 1 ? "h-32" : "h-20"}`}
        src={imageUrl}
        alt={imageUrl}
      />
      <input
        type="checkbox"
        className="absolute hidden group-hover:block w-6 h-6 cursor-pointer"
        checked={checkedImg.includes(id)}
        onChange={handleCheck}
      />
    </div>
  );
};

export default ProductItem;
