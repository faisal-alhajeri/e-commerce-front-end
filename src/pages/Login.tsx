import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Center from "../components/layout/Center";
import { InputWithLabel } from "../components/forms/Input";
import AuthBox from "../features/auth/components/AuthBox";
import FillHieght from "../components/layout/FillHieght";
import MyLogo from "../components/MyLogo";
import AuthPageLayout from "../features/auth/layout/AuthPageLayout";
import { useAuth } from "../features/auth/context/AuthContext";
import { inputValidationTypes, messegesTypes } from "../types/types";
import MyButton from "../components/forms/MyButton";
import { Link } from "react-router-dom";
import useStateWithValidator from "../hooks/useStateWithValidator";
import { usernamePolicy } from "../features/auth/policies";
import { useMyAxios } from "../hooks/useAxios";
import { useFlashMesseges } from "../features/flash_messages/context/FlashMessegesContext";
import { ClimbingBoxLoader, FadeLoader } from "react-spinners";

export default function Login() {
  const { user, login } = useAuth();
  const {addMessege} = useFlashMesseges()
  const [email, setEmail, validEmail] = useStateWithValidator<string>(
    "",
    usernamePolicy
  );

  const [password, setpassword, validpassword] = useStateWithValidator<string>(
    "",
    (name) => name !== ""
  );

  const [{ loading, error }, refetch] = useMyAxios(
    {
      url: "login/",
      method: "post",
      data: { email, password },
    },
    { manual: true }
  );

  const handleLogin = () => {
    refetch()
      .then((res) => login(res.data))
      .catch(err => addMessege('email or password are wrong', messegesTypes.ERROR));
  };

  return (
    <>
      <AuthPageLayout>
        <AuthBox title="Login">
          <AuthBox.AuthBoxForm>
            <InputWithLabel
              inputName={"email"}
              label={"Email or Username"}
              className="py-2 w-75"
              inputClassName="w-100"
              inputContainerClassName="w-100"
              required
              onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
              infoMessage="email must be larger thatn 8 characters"
            />

            <InputWithLabel
              inputName={"password"}
              label={"Password"}
              type={"password"}
              className="py-2 w-75"
              inputClassName="w-100"
              inputContainerClassName="w-100"
              required
              onChange={(e) => setpassword((e.target as HTMLInputElement).value)}
            />

            <MyButton
              type="submit"
              className="my-3 w-50"
              variant="outline-info"
              onClick={() => handleLogin()}
              disabled={!validEmail || !validpassword || loading}
            >
              { "Login"}
            </MyButton>
            <p className="my-3">
              {`register new account?`}
              <Link to={"/signup"}> {"register"}</Link>
            </p>
          </AuthBox.AuthBoxForm>
        </AuthBox>
      </AuthPageLayout>
    </>
  );
}
