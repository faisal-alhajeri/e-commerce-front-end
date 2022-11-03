import React from "react";
import { Stack } from "react-bootstrap";
import { orderType } from "../../../types/types";

export default function OrderSlot({ order }: { order: orderType }) {
  return (
    <div
      className="bg-secondary my-4 p-3 rounded-4 border "
      style={{ height: "150px", overflow: "hidden" }}
    >
      <Stack direction="horizontal">
        <span className="fs-5 mb-3">Order: {order.uuid}</span>
        <span className="ms-auto">

          {
            order.created_at
          }
        </span>

      </Stack>
      <Stack gap={3} className="ms-auto" direction="horizontal">
      <span>{order.total} SR</span>


      </Stack>
    </div>
  );
}
