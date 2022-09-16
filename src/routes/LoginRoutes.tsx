import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/context/AuthContext'

export  function LoginRoutes({children, ...props}: React.ComponentProps<typeof Routes>) {
  const {authinticated} = useAuth()
 const navigate = useNavigate()

  if(!authinticated()){
    navigate('/login', {replace: true})
  }
  return ( 
    <Routes {...props}>
      {children}
    </Routes>
    
  )
}

export  function LoginRoute({...props}: React.ComponentProps<typeof Route>) {
  const {authinticated} = useAuth()
 const navigate = useNavigate()

  if(!authinticated()){
    navigate('/login', {replace: true})
  }
  return ( 
    <Route {...props} />

    
  )
}
