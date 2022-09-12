import React, { useId } from 'react'
import { elementType } from '../../types/types';

type inputWithLabelProps = elementType & {
  label: string
  inputName?: string,
  className?: string,
  inputClassName?: string,
  [key: string] : any
}


export function InputWithLabel({label, inputName, className, inputClassName,...props}: inputWithLabelProps) {
    const id = useId()
    console.log(props);
    
  return (
    <>
        <div className={`${className}`}>
            <div>
                <label htmlFor={id}  >{label}</label>
            </div>
            <input name={inputName? inputName: label} id={id} type='text' className={inputClassName} {...props} />
        </div>
    </>
  )
}
