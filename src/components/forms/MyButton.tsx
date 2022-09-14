import React, { PropsWithChildren, ReactNode } from 'react'
import { Button } from 'react-bootstrap'
import { elementType } from '../../types/types'

type buttonType = React.ComponentProps<typeof Button>

export default function MyButton({className, children,...props}: buttonType ) {
  return (
    <Button className={`${className ?? ''}`} {...props}>
        {children}
    </Button>
  )
}
