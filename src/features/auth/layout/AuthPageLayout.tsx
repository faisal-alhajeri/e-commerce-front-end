import React, { ReactNode } from 'react'
import {  Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { InputWithLabel } from '../../../components/forms/Input'
import MyButton from '../../../components/forms/MyButton'
import Center from '../../../components/layout/Center'
import FillHieght from '../../../components/layout/FillHieght'
import MyLogo from '../../../components/MyLogo'
import AuthBox from '../components/AuthBox'

type authLayoutProps = {
    title: string,
    inputFields: [string, string][],
    isLogin: boolean
}

export default function AuthPageLayout({title, inputFields, isLogin}: authLayoutProps) {
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
              <AuthBox title={title}>
                <div className="w-75 d-flex flex-column justify-content-center align-items-center">

                    {
                        inputFields.map(entry => {
                            return <InputWithLabel
                            inputName={entry[0]}
                            label={entry[1]}
                            className='py-2 w-75'
                            inputClassName='w-100' />
                        })
                    }



                  <MyButton className="my-3 w-50" variant="outline-info">
                    {title}
                  </MyButton>
                  <p className="my-3">
                    {isLogin? 
                    `register new account` 
                    :
                    'already had an account?'}
                    <Link to={isLogin? '/signup' : '/login'}> {isLogin? 'register' : 'login'}</Link>
                  </p>
                    
                </div>
              </AuthBox>
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