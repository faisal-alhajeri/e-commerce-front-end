import React from "react";
import Center from "../../../components/center/Center";
import './AuthBox.css'
type authBoxProps = {
    className?: String,
    children: any
}

export default function AuthBox({className, children}: authBoxProps) {
  return(
    <Center className={`auth-box w-xxl-25 w-md-50 h-50 rounded-4 bg-secondary d-flex flex-column align-items-center justify-content-evenly ${className}`}>
        {children}
    </Center>
  ) 
}
