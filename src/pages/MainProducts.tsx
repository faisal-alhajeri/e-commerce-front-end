import React, { useEffect } from "react";
import ProductCard from "../features/store/components/ProductCard";
import img from "../assets/flowers_spring_bloom_165809_1920x1080.jpg";
import img2 from "../assets/IMG_0772.jpg";
import { Col, Container, Row } from "react-bootstrap";
import allProductsService from "../features/store/services/allProductsService";
import Center from "../components/layout/Center";
import { productType } from "../types/types";
import FillHieght from "../components/layout/FillHieght";
import ProductCardList from "../features/store/components/ProductCardList";

let images = [img, img2]

export default function MainProducts() {
  const [{ loading, data, error }, refresh] = allProductsService();

  useEffect(() => {
    refresh()
  }, [])

  return (
    <>

      {loading ? (
        <FillHieght>
          <Center>
            <div>

            loading ...
            </div>
          </Center>

        </FillHieght>
      ) : (

        <ProductCardList refresh={refresh} data={data} variant="lg" />
      )}

      
    </>
  );
}
