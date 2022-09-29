import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminCreateModifyProduct from '../pages/admin/AdminCreateModifyProduct'
import AdminHome from '../pages/admin/AdminHome'
import AdminProducts from '../pages/admin/AdminProducts'

export default function AdminRoutes() {
  return (
    <Routes>
        <Route index element={<AdminHome />}/>
        <Route path={'/products'} element={<AdminProducts />}/>
        <Route path={'/products/:id'} element={<AdminCreateModifyProduct />}/>
    </Routes>
  )
}
