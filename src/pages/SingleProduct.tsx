import { faImages } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Card, Container, Ratio } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ImageContainer from "../components/images/ImageContainer";
import UpdateProductButtons from "../features/admin/components/updateProductButtons";
import { useAuth } from "../features/auth/context/AuthContext";
import CartUpdateButtons from "../features/cart/components/CartUpdateButtons";
import { useCart } from "../features/cart/context/CartContext";
import { ProductService } from "../features/store/services/allProductsService";
import { BASE_URL } from "../hooks/useAxios";
import { productType } from "../types/types";

export default function SingleProduct() {
  const { id } = useParams();
  const [values, refetch] = ProductService(id!);
  const product = values.data as productType;
  const [bigImage, setBigImage] = useState<string | null>(null);
  const {authinticated, isAdmin} = useAuth()
  const {getCartItem} = useCart()
  const thisCartItem = getCartItem(product?.uuid ?? '')


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
                src={
                  !bigImage
                    ? `${BASE_URL}${product?.mainImageUrl}`
                    : `${BASE_URL}${bigImage}`
                }
                className="rounded-2"
              />
            </Ratio>
            {product.images.length > 1 && (
              <div
                className=""
                style={{ overflowX: "scroll", whiteSpace: "nowrap" }}
              >
                {product.images.map((image) => (
                  <ImageContainer
                    onClick={() => setBigImage(image.url)}
                    className="d-inline-block m-1"
                    width={150}
                    ratio="16x9"
                    imgSrc={`${BASE_URL}${image.url}`}
                  />
                ))}
              </div>
            )}
            <Card className="text-start mt-5">
              <Card.Body style={{minHeight: '200px'}}>
                <h2>
                  {product.name} <br />
                </h2>
                {product.description}
              </Card.Body>
              <Card.Footer
                className="d-flex justify-content-between align-items-center"
              >
                <span>{product.price} SR </span>

                {authinticated() && isAdmin() ? (
                  <UpdateProductButtons product={product} />
                ) : (
                  <CartUpdateButtons
                    product={product}
                    cartItem={thisCartItem}
                  />
                )}
              </Card.Footer>
            </Card>
          </Container>
        </>
      )}
    </>
  );
}
