import React, { useEffect } from "react";
import { Container, Ratio } from "react-bootstrap";
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
  return (
    <>
      {product && (
        <>
          <Container className="d-flex  flex-column">
              <Ratio aspectRatio="16x9">
                <img
                  style={{ objectFit: "cover" }}
                  src={`${BASE_URL}${product?.mainImageUrl}`}
                  className="rounded-2"
                />
              </Ratio>
            <div className="text-start mt-5">
              <h2>
              {product?.name ?? ""} <br />

              </h2>
              {product?.description ?? ""}
            </div>
          </Container>
        </>
      )}
    </>
  );
}
