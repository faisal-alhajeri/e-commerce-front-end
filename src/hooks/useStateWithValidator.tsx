import React, { useEffect, useState } from 'react'

export default function useStateWithValidator<T>(init: T | (() => T), validator: (value: T) => boolean): [T, React.Dispatch<React.SetStateAction<T>>,boolean] {
    const [state, setState] = useState<T>(init)
    const [valid, setValid] = useState<boolean>(false)
    

    useEffect(() => {
        setValid(() => validator(state))
    }, [state, validator])


    return [state, setState, valid]
}
