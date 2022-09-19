import { faPlus } from "@fortawesome/free-solid-svg-icons";
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

const cardHeight = 400;
const cardWidth = 300;
const imageContainerHeight = "50%";

export default function ProductCard({
  product,
  variant
}: {
  product: productType;
  variant: 'lg' | 'sm'
}) {
  let t = `        this is a red apple lorem impsum this is a red apple lorem impsum this
    is a red apple lorem impsumthis is a red apple lorem impsum this is a
    red apple lorem impsumthis is a red apple lorem impsum`;
  // const [height, setHeight] = useState<number>(0)
  const bodyRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (bodyRef.current) {
      // console.log(bodyRef.current.after('...'))
    }
  }, []);
  // console.log(product.description);

  return (
    <Card border="dark" className={`shadow-sm product-card-${variant}`}>
      <div className="product-card-image-container">
        <Card.Img className="product-card-image" variant="top" src={`${BASE_URL}/${product.images[0]}`} />
      </div>

      <Card.Body
        ref={bodyRef}
        className='product-card-body'
      >
        <Card.Title>{product.name}</Card.Title>

        {shortenText(product.description, 100)}
        {/* {product.description} */}
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-center">
        <span>{product.price} SR </span>
        <MyButton variant="outline-info" className="rounded-circle">
          <FontAwesomeIcon icon={faPlus} />
        </MyButton>
      </Card.Footer>
    </Card>
  );
}
