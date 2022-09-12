import React from 'react'
import myImage from "../assets/react.svg";
import { elementType } from '../types/types';

type logoProps = elementType & {
    className?: string
}

export default function MyLogo({className}: logoProps) {


    return (
    <img src={myImage} className={`logo ${className}`} />
  )
}
