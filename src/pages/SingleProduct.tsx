import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductService } from "../features/store/services/allProductsService";
import { BASE_URL } from "../hooks/useAxios";
import { productType } from "../types/types";

export default function SingleProduct() {
  const { id } = useParams();
  const [values, refetch] = ProductService(id!);

  const product = values.data as productType;
  useEffect(() => {
    refetch();
  }, [id]);
  return(

  <>
    {product?.name ?? ''} <br />
    {product?.description ?? ''}
    <img src={`${BASE_URL}${product?.mainImageUrl}`} />
  </>
  ) 
}
