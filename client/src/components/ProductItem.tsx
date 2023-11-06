interface ProductItemType {
  imageUrl: string;
  position: number;
}

const ProductItem = ({ imageUrl, position }: ProductItemType) => {
  let imageContent;
  if (position === 1) {
    imageContent = (
      <div className="bg-gray-500/20 col-span-2 row-span-2 min-h-[200px] min-w-[200px]  rounded">
        <img
          className="object-contain w-32 h-32"
          src={imageUrl}
          alt={imageUrl}
        />
      </div>
    );
  } else {
    imageContent = (
      <div className="bg-gray-500/20 min-h-[100px] rounded flex justify-center items-center">
        <img
          className="object-contain w-20 h-20"
          src={imageUrl}
          alt={imageUrl}
        />
      </div>
    );
  }
  return <>{imageContent}</>;
};

export default ProductItem;
