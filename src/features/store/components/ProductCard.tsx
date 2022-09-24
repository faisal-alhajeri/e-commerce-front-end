import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Card, Container } from "react-bootstrap";
import MyButton from "../../../components/forms/MyButton";
import img from "../../../assets/flowers_spring_bloom_165809_1920x1080.jpg";
import img2 from "../../../assets/IMG_0772.jpg";
import { shortenText } from "../../../util/TextShortner";
import { productType } from "../../../types/types";
import "./product.css";
import { BASE_URL } from "../../../hooks/useAxios";
import { useCart } from "../../cart/context/CartContext";
import ModifyCartServices from "../../cart/services/CartServices";
import CartUpdateButtons from "../../cart/components/CartUpdateButtons";
import { useAuth } from "../../auth/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const cardHeight = 400;
const cardWidth = 300;
const imageContainerHeight = "50%";

export default function ProductCard({
  product,
  variant,
}: {
  product: productType;
  variant: "lg" | "sm";
}) {
  const bodyRef = useRef<HTMLDivElement>(null!);
  const { values, increment, decrement } = ModifyCartServices();
  const { getCartItem } = useCart();
  const { authinticated } = useAuth();
  const navigate = useNavigate()
  const thisCartItem = authinticated()? getCartItem(product.uuid): undefined;

  return (
    <Card border="dark" className={`shadow-sm product-card-${variant}`}>
      <div className="product-card-image-container">
        <Card.Img
          className="product-card-image"
          variant="top"
          src={`${BASE_URL}/${product.images[0]}`}
        />
      </div>

      <Card.Body ref={bodyRef} className="product-card-body">
        <Card.Title>{product.name}</Card.Title>

        {shortenText(product.description, 30)}
        {/* {product.description} */}
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-center">
        <span>{product.price} SR </span>
        {/* {authinticated() ? (
          <CartUpdateButtons product={product} cartItem={thisCartItem} />
        ) : (
          <MyButton
            onClick={() => navigate("/login")}
            className="rounded-circle"
            variant="outline-info"
          >
            <FontAwesomeIcon icon={faPlus} />
          </MyButton>
        )} */}

<CartUpdateButtons product={product} cartItem={thisCartItem} />

      </Card.Footer>
    </Card>
  );
}
