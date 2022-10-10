import { faCode, faGear, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import MyButton from "../../../components/forms/MyButton";
import { productType } from "../../../types/types";
import { useFlashMesseges } from "../../flash_messages/context/FlashMessegesContext";
import { useProductList } from "../../store/context/ProductListContext";
import { deleteProductService } from "../../store/services/allProductsService";

export default function UpdateProductButtons({
  product,
}: {
  product: productType;
}) {
  const [deleteValues, deleteFetch] = deleteProductService(product.uuid);
  const navigate = useNavigate();
  const { refresh } = useProductList();
  const {addSuccessMessege} = useFlashMesseges()

  return (
    <div className="d-flex g-4">
      <Link to={`/admin/products/${product.uuid}`}>
        <MyButton variant="outline-success" className="rounded-circle mx-1">
          <FontAwesomeIcon icon={faGear} />
        </MyButton>
      </Link>
      <MyButton
        onClick={() =>
          deleteFetch().then((res) => {
            if(refresh){
              refresh();
            } else {
              navigate(-1)
            }

            addSuccessMessege(`product ${product.name} deleted successfully`)
          })
        }
        variant="outline-danger"
        className="rounded-circle mx-1"
      >
        {deleteValues.loading ? "..." : <FontAwesomeIcon icon={faTrash} />}
      </MyButton>
    </div>
  );
}
