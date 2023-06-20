import { Product } from "../../components/interfaces";

const ProductCard = ({ product: { ProductID, ProductName, ProductPhotoURL, ProductStatus } }: { product: Product }) => {
  return (
    <div className="flex flex-col rounded">
      <img src={ProductPhotoURL} alt={ProductName} className="aspect-square object-cover" />
      <div className="flex flex-col justify-between flex-grow p-4 bg-white gap-2">
        <div className="flex justify-between">
          <div className="text-xl font-bold">{ProductName}</div>
          <span className="text-sm text-white font-bold rounded-sm bg-red-800 px-2 py-1 items-center w-fit">
            {ProductStatus}
          </span>
        </div>
        <div className="text-xs text-gray-500">ID: {ProductID}</div>
      </div>
    </div>
  );
};

export default ProductCard;
