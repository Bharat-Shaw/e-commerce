import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import ResigtrationPage from '../pages/ResigtrationPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import CartPage from '../pages/CartPage'

function Allrouter() {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<ResigtrationPage/>}/>
        <Route path='/product/:id' element={<ProductDetailPage/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='*' element={<div className='w-full flex justify-center h-[95vh] items-center'>
          <h2 className='text-[50px] font-medium'>Invalid route</h2>
        </div>}/>
    </Routes>
  )
}

export default Allrouter