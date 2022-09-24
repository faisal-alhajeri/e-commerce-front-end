import { useMyAxios } from "../../../hooks/useAxios";

export function allOrderService() {
  const [values, refresh] = useMyAxios({
    url: "orders/",
    method: "get",
  });

  return { values, refresh };
}

export function completeOrderService() {
  const [values, refresh] = useMyAxios(
    {
      url: "orders/order/",
      method: "post",
    },
    { manual: true }
  );



  return { values, makeOrder: refresh };
}
