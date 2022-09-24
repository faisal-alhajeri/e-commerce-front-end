import React from "react";
import { Stack } from "react-bootstrap";
import { orderType } from "../../../types/types";

export default function OrderSlot({ order }: { order: orderType }) {
  return (
    <div
      className="bg-secondary my-4 p-3 rounded-4 border "
      style={{ height: "150px", overflow: "hidden" }}
    >
      <Stack>
        <span>{order.total}</span>
        <span>
          {order.items.map((item) => {
            
            return item.product.name;
          })}
        </span>
      </Stack>
    </div>
  );
}
