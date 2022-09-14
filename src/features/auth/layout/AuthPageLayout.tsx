import React, { ReactNode, SyntheticEvent, useRef } from 'react'
import {  Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { InputWithLabel } from '../../../components/forms/Input'
import MyButton from '../../../components/forms/MyButton'
import Center from '../../../components/layout/Center'
import FillHieght from '../../../components/layout/FillHieght'
import MyLogo from '../../../components/MyLogo'
import { anyObject, inputValidationTypes } from '../../../types/types'
import AuthBox from '../components/AuthBox'
import { loginFormType, RegisterFormType } from '../context/AuthContext'

type authLayoutProps = {

    children?: any
}

export default function AuthPageLayout({ children}: authLayoutProps) {
  const formRef = useRef<HTMLFormElement>(null!)

  return (
      <>
      <FillHieght>
        <Row lg={2} sm={1} className="g-3 h-100">
          <Col className="d-none d-lg-block">
            <Center>
              <MyLogo className="w-75"/>
            </Center>
          </Col>
          <Col>
            <Center>
              {children}
            </Center>
          </Col>
        </Row>
      </FillHieght>
      </>
  )
}


{/* <InputWithLabel */}
//     label="username"
//     className="py-2 w-100"
//     inputClassName="w-100"
//   />
//   <InputWithLabel
//     label="password"
//     className="py-2 w-100"
//     inputClassName="w-100"
//   />