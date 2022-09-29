import React from 'react'
import { Link } from 'react-router-dom'
import MyButton from '../../components/forms/MyButton'
import AdminRequired from '../../features/auth/AdminRequired'

export default function AdminHome() {
  return (
    <AdminRequired>
       <Link to='/admin/products'>Products</Link>
    </AdminRequired>
  )
}
