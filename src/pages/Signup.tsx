import React from "react";
import { Link } from "react-router-dom";
import { InputWithLabel } from "../components/forms/Input";
import MyButton from "../components/forms/MyButton";
import AuthBox from "../features/auth/components/AuthBox";
import { useAuth } from "../features/auth/context/AuthContext";
import AuthPageLayout from "../features/auth/layout/AuthPageLayout";
import { usernamePolicy } from "../features/auth/policies";
import useStateWithValidator from "../hooks/useStateWithValidator";
import { inputValidationTypes } from "../types/types";

export default function Signup() {
  const { user, signup } = useAuth();
  const [username, setUsername, validUsername] = useStateWithValidator<string>(
    "",
    usernamePolicy
  );

  const [password1, setpassword1, validpassword1] =
    useStateWithValidator<string>("", (name: string) => name !== "");

  const [password2, setpassword2, validpassword2] =
    useStateWithValidator<string>("", (name: string) => name !== "");

  return (
    <>
      <AuthPageLayout>
        <AuthBox title="Register">
          <AuthBox.AuthBoxForm>
            <InputWithLabel
              inputName={"username"}
              label={"Username"}
              className="py-2 w-75"
              inputClassName="w-100"
              inputContainerClassName="w-100"
              validator={(value: string) => {
                if (value === "") return inputValidationTypes.NEUTRAL;
                if (value.length < 5) return inputValidationTypes.NOT_VALID;
                return inputValidationTypes.VALID;
              }}
              required
              onChange={({ target }) => setUsername(target.value)}
              invalidMessage="username must be larger than 3 characters"
            />

            <InputWithLabel
              inputName={"password1"}
              label={"Password"}
              type={"password"}
              className="py-2 w-75"
              inputClassName="w-100"
              inputContainerClassName="w-100"
              required
              onChange={({ target }) => setpassword1(target.value)}
            />

            <InputWithLabel
              inputName={"password2"}
              label={"Confirm Password"}
              type={"password"}
              className="py-2 w-75"
              inputClassName="w-100"
              inputContainerClassName="w-100"
              required
              onChange={({ target }) => setpassword2(target.value)}
            />

            <MyButton
              type="submit"
              className="my-3 w-50"
              variant="outline-info"
              onClick={() => {
                console.log(username, validUsername);
                console.log(password2, validpassword2);
              }}
              disabled={!validUsername || !validpassword2 || !validpassword1}
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
