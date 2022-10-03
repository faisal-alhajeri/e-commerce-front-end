import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFlashMesseges } from "../flash_messages/context/FlashMessegesContext";
import { useAuth } from "./context/AuthContext";
import LoginRequired from "./LoginRequired";

export default function AdminRequired({ children }: { children: any }) {
  const { isAdmin, siteIsLoading, siteResponse } = useAuth();
  const navigate = useNavigate();
  const { addErrorMessege } = useFlashMesseges();
  const count = useRef<number>(0);

  useEffect(() => {
    if (!siteIsLoading && siteResponse && count.current == 0) {
      
      if (!isAdmin()) {
        navigate("/login", { replace: true });
        addErrorMessege("you must be admin to access this page");
      }
      count.current++;
    }
  }, []);

  return <>{children}</>;
}
