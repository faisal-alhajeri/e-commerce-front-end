import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainProducts from '../pages/MainProducts'
import SingleProduct from '../pages/SingleProduct'

export default function ProductsRoutes() {
  return (
    <Routes>
        <Route index element={<MainProducts />} />
        <Route path='/:id' element={<SingleProduct />} />
    </Routes>
  )
}
