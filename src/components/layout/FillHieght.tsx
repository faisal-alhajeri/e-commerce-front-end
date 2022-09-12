import React from 'react'
import { elementType } from '../../types/types'
import './layouts.css'


export default function FillHieght({className, children}: elementType) {
  return (
    <>
        <div className={`fill-height ${className ?? ''}`}>
            {children}
        </div>
    </>
  )
}
