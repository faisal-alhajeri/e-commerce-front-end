import React from "react";
import { Link } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import { InputWithLabel } from "../components/forms/Input";
import MyButton from "../components/forms/MyButton";
import AuthBox from "../features/auth/components/AuthBox";
import { useAuth } from "../features/auth/context/AuthContext";
import AuthPageLayout from "../features/auth/layout/AuthPageLayout";
import { passwordPolicy, usernamePolicy } from "../features/auth/policies";
import { useFlashMesseges } from "../features/flash_messages/context/FlashMessegesContext";
import { useMyAxios } from "../hooks/useAxios";
import useStateWithValidator from "../hooks/useStateWithValidator";
import { inputValidationTypes, messegesTypes } from "../types/types";

export default function Signup() {
  const { user, signup } = useAuth();
  const { addMessege, addErrorMessege } = useFlashMesseges();

  const [username, setUsername, validUsername] = useStateWithValidator<string>(
    "",
    usernamePolicy
  );
  const [email, setEmail, validEmail] = useStateWithValidator<string>(
    "",
    (e: string) => e !== ""
  );

  const [password1, setpassword1, validpassword1] =
    useStateWithValidator<string>("", passwordPolicy);

  const [password2, setpassword2, validpassword2] =
    useStateWithValidator<string>("", (pass: string) => pass !== "");

  const [{ loading, error }, refetch] = useMyAxios(
    {
      url: "register/",
      method: "post",
      data: { email, password1, password2, username },
    },
    { manual: true }
  );
  const handleSignup = () => {
    refetch()
      .then((res) => signup(res.data))
      .catch((err) => {
        if (err.response.status == 406) {
          Object.values<string[]>(err.response.data).forEach((errorArray) => {
            errorArray.forEach((messege) => {
              addErrorMessege(messege);
            });
          });
        } else {
          addErrorMessege("Error");
        }
        console.log(err);
      });
  };

  return (
    <>
      <AuthPageLayout>
        <AuthBox title="Register">
          <AuthBox.AuthBoxForm>
            <InputWithLabel
              inputName={"email"}
              label={"email"}
              className="py-2 w-75"
              inputClassName="w-100"
              inputContainerClassName="w-100"
              required
              onChange={({ target }) => setEmail((target as HTMLInputElement).value)}
            />
            <InputWithLabel
              inputName={"username"}
              label={"Username"}
              className="py-2 w-75"
              inputClassName="w-100"
              inputContainerClassName="w-100"
              validator={(value: string) => {
                if (value === "") return inputValidationTypes.NEUTRAL;
                if (!usernamePolicy(value))
                  return inputValidationTypes.NOT_VALID;
                return inputValidationTypes.VALID;
              }}
              required
              onChange={({ target }) => setUsername((target as HTMLInputElement).value)}
              infoMessage="username must be larger than 3 characters"
            />

            <InputWithLabel
              inputName={"password1"}
              label={"Password"}
              type={"password"}
              className="py-2 w-75"
              inputClassName="w-100"
              inputContainerClassName="w-100"
              required
              validator={(pass: string) => {
                if (pass === "") return inputValidationTypes.NEUTRAL;
                if (!passwordPolicy(pass))
                  return inputValidationTypes.NOT_VALID;
                return inputValidationTypes.VALID;
              }}
              infoMessage="password must be larger than 8 characters"
              onChange={({ target }) => setpassword1((target as HTMLInputElement).value)}
            />

            <InputWithLabel
              inputName={"password2"}
              label={"Confirm Password"}
              type={"password"}
              className="py-2 w-75"
              inputClassName="w-100"
              inputContainerClassName="w-100"
              required
              onChange={({ target }) => setpassword2((target as HTMLInputElement).value)}
            />

            <MyButton
              type="submit"
              className="my-3 w-50"
              variant="outline-info"
              onClick={() => handleSignup()}
              disabled={
                !validEmail ||
                !validpassword2 ||
                !validpassword1 ||
                !validUsername ||
                loading
              }
            >
              {"Register"}
            </MyButton>
            <p className="my-3">
              {`already have an account?`}
              <Link to={"/login"}> {"Login"}</Link>
            </p>
          </AuthBox.AuthBoxForm>
        </AuthBox>
      </AuthPageLayout>
    </>
  );
}
