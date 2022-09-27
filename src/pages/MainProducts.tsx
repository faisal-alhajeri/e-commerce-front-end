import React from "react";
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
  const [{ loading, data, error }] = allProductsService();


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
        // <Row xxl={4} xl={3}  md={2} xs={1} className="g-4 grid ">
        //   {data.map((product: productType, index: number) => {
        //     return (
        //       <Col key={product.uuid} className="d-flex justify-content-center">
        //         <ProductCard variant="lg" product={product} />
        //       </Col>
        //     );
        //   })}

        // </Row>
        <ProductCardList data={data} variant="lg" />
      )}

      
    </>
  );
}
