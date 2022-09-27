import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { productType } from '../../../types/types';
import ProductCard from './ProductCard';

export default function ProductCardList({data, variant}: {data: any, variant: 'lg' | 'sm'}) {
  return (
    <>
            <Row xxl={4} xl={3}  md={2} xs={1} className="g-4 grid ">
          {data.map((product: productType, index: number) => {
            return (
              <Col key={product.uuid} className="d-flex justify-content-center">
                <ProductCard variant={variant} product={product} />
              </Col>
            );
          })}
        </Row>

    </>
  )
}
