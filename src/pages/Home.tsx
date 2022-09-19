import React, { ElementType, useState } from "react";
import { Container } from "react-bootstrap";
import { Input, InputWithLabel } from "../components/forms/Input";
import MyButton from "../components/forms/MyButton";
import { useAuth } from "../features/auth/context/AuthContext";
import LoginRequired from "../features/auth/LoginRequired";
import { useFlashMesseges } from "../features/flash_messages/context/FlashMessegesContext";
import { useMyAxios } from "../hooks/useAxios";
import { messegesTypes } from "../types/types";

export default function Home() {
  const [currentMessege, setCurrentMessege] = useState<string>("");
  const { addMessege } = useFlashMesseges();
  const { user } = useAuth();

  const [valuesReq, rReq, cReq] = useMyAxios(
    {
      url: "products/req",
    },
    {
      manual: true,
    }
  );

  const [values, r, c] = useMyAxios(
    {
      url: "products/",
    },
    {
      manual: true,
    }
  );
  // loginRequired()

  return (
    <LoginRequired>
      {JSON.stringify(user)}
      {/* <InputWithLabel
          label="messege"
          onChange={(e: any) => setCurrentMessege(e.target.value)}
        /> */}

      <Container>
        <MyButton onClick={() => rReq()} className="m-5">
          fetch login required
        </MyButton>
        <div>
          {/* {JSON.stringify(valuesReq.error)} */}
          {valuesReq.loading
            ? "loadinng ... "
            : valuesReq.error
            ? JSON.stringify(valuesReq.error)
            : JSON.stringify(valuesReq.data)}
        </div>
      </Container>

      <Container>
        <MyButton onClick={() => r()} className="m-5">
          fetch
        </MyButton>
        <div>
          {/* {JSON.stringify(valuesReq.error)} */}
          {values.loading
            ? "loadinng ... "
            : values.error
            ? JSON.stringify(values.error)
            : JSON.stringify(values.data)}
        </div>
      </Container>
    </LoginRequired>
  );
}
