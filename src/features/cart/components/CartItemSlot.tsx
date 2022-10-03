import React from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { BASE_URL } from "../../../hooks/useAxios";
import { cartItemType } from "../../../types/types";
import { currencyForamtter } from "../../../util/currencyFormatter";
import "./CartItemSlot.css";
import CartUpdateButtons from "./CartUpdateButtons";

export default function CartItemSlot({ cartItem }: { cartItem: cartItemType }) {
  return (
    <Container
      style={{ height: "150px", overflow: "hidden" }}
      className="rounded-4 border bg-secondary my-4"
    >
      <Row className="cart-item-slot-row">
        <Col
          className="cart-item-slot-col1 border"
          style={{ padding: "0px", overflow: "hidden" }}
          xs={2}
        >
          <img
            className="cart-item-slot-img"
            src={`${BASE_URL}${cartItem.product.mainImageUrl}`}
            alt={cartItem.product.images[0]}
          />
        </Col>

        <Col
          className="cart-item-slot-col2 p-3 d-flex justify-content-between"
          xs={10}
        >
          <h4 className="">{cartItem.product.name}</h4>
          <div className="text-end">
            <Stack className="" gap={3}>
              <span><CartUpdateButtons product={cartItem.product} cartItem={cartItem} /></span>
              <span className="">{currencyForamtter.format(cartItem.product.price)}</span>
              <span>{currencyForamtter.format(cartItem.product.price * cartItem.quantity)}</span>
            </Stack>
          </div>
        </Col>
      </Row>
      {/* {JSON.stringify(cartItem)} */}
    </Container>
  );
}
