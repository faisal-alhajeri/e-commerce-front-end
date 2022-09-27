import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductsService } from "../features/store/services/allProductsService";
import { productType } from "../types/types";

export default function SingleProduct() {
  const { id } = useParams();
  const [values, refetch] = ProductsService(id!);

  const product = values.data as productType;
  useEffect(() => {
    refetch();
  }, [id]);
  return <>{product?.name ?? ''}</>;
}
