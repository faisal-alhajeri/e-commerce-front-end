import React from 'react'
import AuthPageLayout from '../features/auth/layout/AuthPageLayout'

export default function Signup() {
  return (
    <AuthPageLayout
    title="Register"
    inputFields={[
        ['username','username'], 
        ['password1', 'password'],
        ['password2', 'confirm password'],
        ]} 
    isLogin={false}
    />
  )
}
