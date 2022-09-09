import React from 'react'
import { Container } from 'react-bootstrap'
import './Center.css'

type centerProps = {
    className?: String,
    children: any
}

export default function Center({className, children}: centerProps) {
    return (
        <>
            <Container className={`center ${className}`}>
                {children}
            </Container>
        </>
      )
}
