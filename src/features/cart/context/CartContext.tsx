import React, { ReactNode, useContext, useEffect, useState } from "react";
import { myAxios, useMyAxios } from "../../../hooks/useAxios";
import { cartItemType, cartType, productType } from "../../../types/types";
import { useAuth } from "../../auth/context/AuthContext";
import ModifyCartServices from "../services/CartServices";



type cartContextValues = {
  cart: cartType;
  updateCart: (newCart: cartType) => void
  getCartItem: (productId: string) => cartItemType | undefined;
  updateCartItem: (productId: string, newCartItem: cartItemType) => void;
};

const context = React.createContext<cartContextValues>({} as cartContextValues);

export function useCart() {
  return useContext(context);
}

export default function CartProvider({ children }: { children: any }) {
  const { user, authinticated } = useAuth();
  const [cart, setCart] = useState<cartType>(
    {} as cartType
  );
  const [values, refetch] = useMyAxios(
    {
      url: "cart/",
      method: "get",
    },
    { manual: true }
  );

  function fetchAll() {
    refetch().then((res) => setCart(res.data));
  }

  useEffect(() => {
    if (authinticated()) {
      console.log("fetching all cart items");

      fetchAll();
    }
  }, [user]);

  function getCartItem(productId: string): cartItemType | undefined {
    return cart.items.find((item) => item.product.uuid === productId);
  }

  // function _deleteFromCart(productId: string) {
  //   `delete item from cart`;

  //   setCart((cart) =>
  //     cart.items.filter((item) => item.product.uuid !== productId)
  //   );
  // }

  function updateCartItem(productId: string, newProduct: cartItemType) {
    `update the cart with new cart item, if exsists update, or create new, or delete if quantity === 0`;

    setCart((oldCart) => {
      // quantity === 0 then delete
      const newCart = {...oldCart}
      const oldItem = oldCart.items.find((item) => item.product.uuid === productId);

      if (newProduct.quantity === 0) {
        newCart.items = oldCart.items.filter((item) => item.product.uuid !== productId);
      }
      // create new item
      else if (!oldItem) {
        newCart.items = [...newCart.items, newProduct];
      }
      // update old item
      else{
        newCart.items = newCart.items.map((cartItem) => {
          if (cartItem.product.uuid === productId) {
            return newProduct;
          } else {
            return cartItem;
          }
        });
      } 

      return newCart

    });
  }

  function updateCart(newCart: cartType){
    setCart(oldCart => {
      return newCart
    })
  }

  return (
    <context.Provider
      value={{
        cart,
        updateCart,
        getCartItem,
        updateCartItem,
      }}
    >
      {children}
    </context.Provider>
  );
}
