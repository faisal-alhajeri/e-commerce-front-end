import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MyButton from "../components/forms/MyButton";
import Center from "../components/layout/Center";
import FillHieght from "../components/layout/FillHieght";
import { useAuth } from "../features/auth/context/AuthContext";
import LoginRequired from "../features/auth/LoginRequired";
import CartItemSlot from "../features/cart/components/CartItemSlot";
import { useCart } from "../features/cart/context/CartContext";
import { fetchCartService } from "../features/cart/services/CartServices";
import { useFlashMesseges } from "../features/flash_messages/context/FlashMessegesContext";
import { completeOrderService } from "../features/order/services/OrderServices";

export default function CartPage() {
  const { cart } = useCart();
  const { authinticated } = useAuth();
  const navigate = useNavigate();
  const {values: makeOrderValues, makeOrder} = completeOrderService()
  const {values: fetchCartValues, fetchCart} = fetchCartService()
  const {addSuccessMessege} = useFlashMesseges()

  return (
    <LoginRequired>
      <h2>Cart</h2>
        {authinticated() &&
          cart?.items?.map((cartItem) => (
            <CartItemSlot key={cartItem.uuid} cartItem={cartItem} />
          ))}

        {authinticated() && cart?.items?.length === 0 ? (
          <FillHieght>
            <Center>
              <span className="fs-2">
                Your cart is empty{" "}
                <MyButton
                  variant="outline-info"
                  onClick={() => navigate("/products")}
                >
                  Products
                </MyButton>
              </span>
            </Center>
          </FillHieght>
        ) : (
          <div className="container">
            <div className="fs-1 my-2">
              Total price:
              {cart.total}
            </div>
            <div>
              <MyButton onClick={() => makeOrder().then(res => fetchCart().then(res => {addSuccessMessege('Order Successfull');navigate('/orders')}))} variant="outline-success" className="p-2 w-100">
                {makeOrderValues.loading || fetchCartValues.loading? 'loading ... ' : 'Complete Order'}
              </MyButton>
            </div>
          </div>
        )}
    </LoginRequired>
  );
}
