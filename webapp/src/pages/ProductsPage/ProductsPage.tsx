import React from "react";
import PageWrapper from '../PageWrapper';

const ProductsPage = () => {
  /*
    TODO:
      When the drag ends we want to keep the status persistant across logins. 
      Instead of modifying the data locally we want to do it serverside via a post
      request
  */
  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold text-white">
        Product Page Goes Here
      </h1>
    </PageWrapper>
  );
};

export default ProductsPage
