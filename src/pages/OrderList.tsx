import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import LoginRequired from "../features/auth/LoginRequired";
import OrderSlot from "../features/order/components/OrderSlot";
import { allOrderService } from "../features/order/services/OrderServices";
import { orderType } from "../types/types";

export default function OrderList() {
  const { values, refresh } = allOrderService();
  
  useEffect(() => {    
    refresh()
  }, [])

  return (
    <LoginRequired>
      <h1>Orders</h1>
      <Container>
        {values.loading ? (
          "loading ..."
        ) : (
          <div className="m-1">
            {values.data.map((order: orderType) => {
              return <OrderSlot order={order} />;
            })}
          </div>
        )}
      </Container>
    </LoginRequired>
  );
}
