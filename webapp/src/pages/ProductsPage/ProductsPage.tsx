import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { Product } from "../../components/interfaces";
import { getActiveProducts } from "../ApiHelper";
import { DATA_STATES } from "../HomePage/HomePage";
import PageWrapper from "../PageWrapper";
import ProductCard from "./ProductCard";

const ProductsPage = () => {
  /*
    TODO:
      When the drag ends we want to keep the status persistant across logins. 
      Instead of modifying the data locally we want to do it serverside via a post
      request
  */

  const [loadingState, setLoadingState] = useState(DATA_STATES.waiting);
  const [data, setData] = useState([] as Product[]);
  console.log(`🚀 ~ ProductsPage ~ data:`, data);

  const getProducts = async () => {
    setLoadingState(DATA_STATES.waiting);
    const { activeProducts, errorOccurred } = await getActiveProducts();
    setData(activeProducts);
    setLoadingState(errorOccurred ? DATA_STATES.error : DATA_STATES.loaded);
  };

  useEffect(() => {
    getProducts();
  }, []);

  let content;
  if (loadingState === DATA_STATES.waiting)
    content = (
      <div className="flex flex-row justify-center w-full pt-4" data-testid="loading-spinner-container">
        <Spinner />
      </div>
    );
  else if (loadingState === DATA_STATES.loaded)
    content = (
      <div
        className="grid w-full pt-4 gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        data-testid="pipeline-container"
      >
        {data.map((product: Product) => (
          <ProductCard product={product} key={product.ProductID} />
        ))}
      </div>
    );
  else
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4 text-3xl font-bold text-white"
        data-testid="error-container"
      >
        An error occured fetching the data!
      </div>
    );

  return <PageWrapper>{content}</PageWrapper>;
};

export default ProductsPage;
