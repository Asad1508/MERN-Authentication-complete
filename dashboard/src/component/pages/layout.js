import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'
const Layout = () => {
  return (
      <>
    <Navbar/>
    {/* yaha outlet likha ye home ko render krwa rha */}
    <Outlet/>

    </>
  )
}

export default Layout