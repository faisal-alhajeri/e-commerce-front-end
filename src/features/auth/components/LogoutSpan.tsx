import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function LogoutSpan() {
    const {logout} = useAuth()
    return (
    <span onClick={() => logout()}>Logout</span>
  )
}
