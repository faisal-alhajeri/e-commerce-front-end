import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { productType } from '../../../types/types';
import { ProductListProvider } from '../context/ProductListContext';
import ProductCard from './ProductCard';

export default function ProductCardList({data, variant, refresh}: {data: any, variant: 'lg' | 'sm', refresh: () => any}) {
  if(data)
  console.log(123);


  return (
    <ProductListProvider products={data as productType[]} refresh={refresh}>
            <Row xxl={4} xl={3}  md={2} xs={1} className="g-4 grid ">
          {data?.map((product: productType) => {
            return (
              <Col key={product.uuid} className="d-flex justify-content-center">
                <ProductCard variant={variant} product={product} />
              </Col>
            );
          })}
        </Row>

    </ProductListProvider>
  )
}
