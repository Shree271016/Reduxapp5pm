import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout'
import Home from './Pages/Home'
import ProductDetails from './Pages/ProductDetails'
import Cart from './Pages/Cart'

const MyRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element = {<Home/>}/>
            <Route path='Product/:id'element={<ProductDetails/>}/>
            <Route path='Cart' element={<Cart/>}/>

          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default MyRoutes