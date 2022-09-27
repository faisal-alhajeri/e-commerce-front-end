import { faCode, faGear, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import MyButton from "../../../components/forms/MyButton";
import { productType } from "../../../types/types";

export default function UpdateProductButtons({product}: {product: productType}) {
  return (
    <div className="d-flex g-4">
      <MyButton  variant="outline-success" className="rounded-circle mx-1">
      <FontAwesomeIcon icon={faGear} />

    </MyButton> 
      <MyButton variant="outline-danger"  className="rounded-circle mx-1">
      <FontAwesomeIcon icon={faTrash} />

      </MyButton>
    </div>
  );
}
