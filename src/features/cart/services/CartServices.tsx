import React from "react";
import { useMyAxios } from "../../../hooks/useAxios";
import { useCart } from "../context/CartContext";

export default function ModifyCartServices() {
  const { getCartItem, updateCart } = useCart();

  
  const [values, refetch] = useMyAxios(
    {
      url: "cart/add/",
      method: "post",
    },
    { manual: true }
  );

  function increment(product_uuid: string) {
    // const cartItem = getCartItem(product_uuid)
    refetch({
      url: "cart/increment/",
      method: "post",
      data: {
        product_uuid: product_uuid,
      },
    })
    .then(res => updateCart(res.data));
    // if (cartItem) updateCartItem(product_uuid, {...cartItem, quantity: cartItem.quantity+1})
  }

  function decrement(product_uuid: string) {
    // const cartItem = getCartItem(product_uuid)
    
    refetch({
      url: "cart/decrement/",
      method: "post",
      data: {
        product_uuid: product_uuid,
      },
    })
    .then(res => updateCart(res.data));
    // if (cartItem) updateCartItem(product_uuid, {...cartItem, quantity: cartItem.quantity+1})

  }



  return {values, increment, decrement};
}



export function fetchCartService(){
  const {  updateCart } = useCart();

  const [values, refetch] = useMyAxios(
    {
      url: "cart/",
      method: "get",
    },
    { manual: true }
  );

  function fetchCart() {
    return refetch().then((res) => updateCart(res.data));
  }

  return {values, fetchCart}

}