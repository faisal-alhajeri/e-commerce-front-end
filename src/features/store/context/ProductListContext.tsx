import React, { useContext } from "react";
import { productType } from "../../../types/types";

type ProductListContextValues = {
  products: productType[];
  refresh: () => any;
};

export const ProductListContext = React.createContext(
  {} as ProductListContextValues
);

export function useProductList(){
    return useContext(ProductListContext)
}

export function ProductListProvider({
  children,
  products,
  refresh,
}: {
    children: any;
} & ProductListContextValues) {
  return (
    <ProductListContext.Provider value={
        {
            products, 
            refresh
        }
    }>
      {children}
    </ProductListContext.Provider>
  );
}
