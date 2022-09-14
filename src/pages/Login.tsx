import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Center from "../components/layout/Center";
import { InputWithLabel } from "../components/forms/Input";
import AuthBox from "../features/auth/components/AuthBox";
import FillHieght from "../components/layout/FillHieght";
import MyLogo from "../components/MyLogo";
import AuthPageLayout from "../features/auth/layout/AuthPageLayout";
import { useAuth } from "../features/auth/context/AuthContext";
import { inputValidationTypes } from "../types/types";
import MyButton from "../components/forms/MyButton";
import { Link } from "react-router-dom";
import useStateWithValidator from "../hooks/useStateWithValidator";
import { usernamePolicy } from "../features/auth/policies";

export default function Login() {
  const { user, login } = useAuth();
  const [username, setUsername, validUsername] = useStateWithValidator<string>(
    "",
    usernamePolicy
  );

  const [password, setpassword, validpassword] = useStateWithValidator<string>(
    "",
    (name) => name !== "" 
  );


  return (
    <>
      <AuthPageLayout>
        <AuthBox title="Login">
          <AuthBox.AuthBoxForm>
            <InputWithLabel
              inputName={"username"}
              label={"Username"}
              className="py-2 w-75"
              inputClassName="w-100"
              inputContainerClassName="w-100"
              required
              onChange={({ target }) => setUsername(target.value)}
              invalidMessage='username must be larger thatn 8 characters'
            />

            <InputWithLabel
              inputName={"password"}
              label={"Password"}
              type={"password"}
              className="py-2 w-75"
              inputClassName="w-100"
              inputContainerClassName="w-100"
              required
              onChange={({ target }) => setpassword(target.value)}
              
            />

            <MyButton
              type="submit"
              className="my-3 w-50"
              variant="outline-info"
              onClick={() => {
                console.log(username, validUsername);
                console.log(password, validpassword);
              }}

              disabled={!validUsername || ! validpassword}
            >
              {"Login"}
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
