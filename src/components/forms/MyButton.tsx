import React, { PropsWithChildren, ReactNode } from 'react'
import { Button } from 'react-bootstrap'
import { elementType } from '../../types/types'



export default function MyButton({className, children,...props}: elementType ) {
  return (
    <Button className={`${className ?? ''}`} {...props}>
        {children}
    </Button>
  )
}
