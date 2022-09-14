import React from 'react'
import myImage from "../assets/sass-1.svg";
import { elementType } from '../types/types';
import './logo.css'
type logoProps = React.ComponentProps<'img'> & {
    fit?: string
}

export default function MyLogo({className, ...props}: logoProps) {


    return (
    <img {...props} src={myImage} className={`logo ${className}`} />
  )
}
