import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Center from "../components/layout/Center";
import { InputWithLabel } from "../components/forms/Input";
import AuthBox from "../features/auth/components/AuthBox";
import FillHieght from "../components/layout/FillHieght";
import MyLogo from "../components/MyLogo";
import AuthPageLayout from "../features/auth/layout/AuthPageLayout";

export default function Login() {
  return (
    <>
      <AuthPageLayout
        title="Login"
        inputFields={[
          ["username", "username"],
          ["password", "password"],
        ]}
        isLogin={true}
      />
      {/* <FillHieght>
        <Row lg={2} sm={1} className="g-3 h-100">
          <Col className="d-none d-lg-block">
            <Center>
              <MyLogo className="w-75"/>
            </Center>
          </Col>
          <Col>
            <Center>
              <AuthBox title="Login">
                <div className="w-50 d-flex flex-column justify-content-center align-items-center">
                  <InputWithLabel
                    label="username"
                    className="py-2 w-100"
                    inputClassName="w-100"
                  />
                  <InputWithLabel
                    label="password"
                    className="py-2 w-100"
                    inputClassName="w-100"
                  />
                  <Button className="my-3 w-75" variant="outline-info">
                    Login
                  </Button>
                </div>
              </AuthBox>
            </Center>
          </Col>
        </Row>
      </FillHieght> */}
    </>
  );
}
