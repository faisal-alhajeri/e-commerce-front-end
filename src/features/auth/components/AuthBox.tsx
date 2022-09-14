import React from "react";
import Center from "../../../components/layout/Center";
import './AuthBox.css'
type authBoxProps = {
    title?: string,
    className?: String,
    children: any
}

export default function AuthBox({className, title, children}: authBoxProps) {
  return(
    <div className={`auth-box w-100 w-sm-75 w-md-50 w-lg-75 w-xl-50 py-5 rounded-4 bg-secondary d-flex flex-column align-items-center justify-content-evenly d-raltive ${className}`}>
      <h2>{title}</h2>
        {children}
    </div>
  ) 
}


function AuthBoxForm({children}: authBoxProps) {
  return(
    <div className={`w-75 d-flex flex-column justify-content-center align-items-center`}>
        {children}
    </div>
  ) 
}


AuthBox.AuthBoxForm = AuthBoxForm