import React from "react";
import { Button, Container } from "react-bootstrap";
import { InputWithLabel } from "../components/forms/Input";
import AuthBox from "../features/auth/components/AuthBox";

export default function Login() {
  return (
    <>
      <AuthBox>
        <h2>Login</h2>
        <div className="w-50 d-flex flex-column justify-content-center align-items-center">
          <InputWithLabel label="username" className='py-2 w-100' inputClassName='w-100' />
          <InputWithLabel label="password" className='py-2 w-100' inputClassName='w-100'/>
          <Button className="my-3 w-75" variant="outline-info" >Login</Button>
        </div>
      </AuthBox>
    </>
  );
}
