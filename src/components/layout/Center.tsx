import React from 'react'
import { Container } from 'react-bootstrap'
import './layouts.css'

type centerProps = {
    className?: String,
    children: any
}

// center the child in the container
// this element expects one child
export default function Center({className, children}: centerProps) {
    return (
        <>
            <div className={`position-relative w-100 h-100 center ${className?? ''}`}>
                {children}
            </div>
        </>
      )
}
