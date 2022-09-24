import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import MyButton from "../../../components/forms/MyButton";
import { cartItemType, productType } from "../../../types/types";
import ModifyCartServices from "../services/CartServices";

export default function CartUpdateButtons({product,cartItem}: {product: productType,cartItem?: cartItemType}) {
    const {values, increment, decrement } = ModifyCartServices();

  
    return (
    <>
      <div>
        {cartItem?.quantity && (
          <MyButton
            onClick={() => decrement(cartItem.product.uuid)}
            variant="outline-info"
            className="rounded-circle mx-1"
          >
            <FontAwesomeIcon icon={faMinus} />
          </MyButton>
        )}
        <div style={{width: '20px'}} className="d-inline-block text-center">
        {values.loading ? "..." : <span>{cartItem?.quantity ?? ""}</span>}

        </div>
        <MyButton
          onClick={() => increment(product.uuid)}
          variant="outline-info"
          className="rounded-circle mx-1"
        >
          <FontAwesomeIcon icon={faPlus} />
        </MyButton>
      </div>
    </>
  );
}
