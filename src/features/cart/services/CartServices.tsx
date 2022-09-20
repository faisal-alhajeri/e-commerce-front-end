import React from "react";
import { useMyAxios } from "../../../hooks/useAxios";
import { useCart } from "../context/CartContext";

export default function CartServices() {
  const { cartItems, getCartItem, updateCartItem, updateAllCartItems } = useCart();

  
  const [values, refetch] = useMyAxios(
    {
      url: "cart/add/",
      method: "post",
    },
    { manual: true }
  );

  function increment(product_uuid: string) {
    refetch({
      url: "cart/increment/",
      method: "post",
      data: {
        product_uuid: product_uuid,
      },
    })
    .then(res => updateCartItem(product_uuid ,res.data));
  }

  function decrement(product_uuid: string) {
    refetch({
      url: "cart/decrement/",
      method: "post",
      data: {
        product_uuid: product_uuid,
      },
    })
    .then(res => updateCartItem(product_uuid ,res.data));
  }



  return {increment, decrement};
}
