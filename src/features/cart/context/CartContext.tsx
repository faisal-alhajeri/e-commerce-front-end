import React, { ReactNode, useContext, useEffect, useState } from "react";
import { myAxios, useMyAxios } from "../../../hooks/useAxios";
import { productType } from "../../../types/types";
import { useAuth } from "../../auth/context/AuthContext";
import CartServices from "../services/CartServices";

type cartItemType = {
  uuid: string;
  product: productType;
  quantity: number;
};

type cartContextValues = {
  cartItems: cartItemType[];
  updateAllCartItems: (cartItems: cartItemType[]) => void;
  getCartItem: (productId: string) => cartItemType | undefined;
  updateCartItem: (productId: string, newCartItem: cartItemType) => void;
};

const context = React.createContext<cartContextValues>({} as cartContextValues);

export function useCart() {
  return useContext(context);
}

export default function CartProvider({ children }: { children: any }) {
  const { user, authinticated } = useAuth();
  const [cartItems, setCartItems] = useState<cartItemType[]>(
    [] as cartItemType[]
  );
  const [values, refetch] = useMyAxios(
    {
      url: "cart/",
      method: "get",
    },
    { manual: true }
  );

  function fetchAll() {
    refetch().then((res) => updateAllCartItems(res.data));
  }

  useEffect(() => {
    if (authinticated()) {
      console.log("fetching all cart items");

      fetchAll();
    }
  }, [user]);

  function getCartItem(productId: string): cartItemType | undefined {
    return cartItems.find((item) => item.product.uuid === productId);
  }

  function _deleteFromCart(productId: string) {
    `delete item from cart`;

    setCartItems((items) =>
      items.filter((item) => item.product.uuid !== productId)
    );
  }

  function updateCartItem(productId: string, newProduct: cartItemType) {
    `update the cart with new cart item, if exsists update, or create new, or delete if quantity === 0`;

    setCartItems((items) => {
      // quantity === 0 then delete
      if (newProduct.quantity === 0) {
        return items.filter((item) => item.product.uuid !== productId);
      }

      const oldItem = items.find((item) => item.product.uuid === productId);

      // create new item
      if (!oldItem) {
        return [...items, newProduct];
      }

      // update old item
      return items.map((cartItem) => {
        if (cartItem.product.uuid === productId) {
          return newProduct;
        } else {
          return cartItem;
        }
      });
    });
  }

  function updateAllCartItems(cartItems: cartItemType[]) {
    setCartItems((oldC) => cartItems);
  }

  return (
    <context.Provider
      value={{
        cartItems,
        updateAllCartItems,
        getCartItem,
        updateCartItem,
      }}
    >
      {children}
    </context.Provider>
  );
}
