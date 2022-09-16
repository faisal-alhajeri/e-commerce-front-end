import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFlashMesseges } from '../flash_messages/context/FlashMessegesContext';
import { useAuth } from './context/AuthContext';

export default function LoginRequired({children}: {children:any}) {
    const {authinticated} = useAuth()
    const navigate = useNavigate()
    const {addErrorMessege} = useFlashMesseges()
    const count = useRef<number>(0)

    useEffect(() => {
        if(count.current == 0){
            console.log(!authinticated());

            if (!authinticated()) {
              navigate("/login", { replace: true });
              addErrorMessege("you must be authinticated to access this page");
            }
            count.current++
        } 


    }, [])

  
    return (
        <>
        {children}
        </>
    )
}
