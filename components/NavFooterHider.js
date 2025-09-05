"use client"
import { usePathname } from "next/navigation"
import Footer from "./Footer"
import Navbar from "./Navbar"

import React from 'react'

const NavFooterHider = ({children}) => {

    // logic to hide navbar and footer from specific page
    const pathName = usePathname()
    const hidePages = ["/register",'/login',"/admin"]
    const showPages = !hidePages.includes(pathName)

  return (
    <>
        {showPages && <Navbar/>}
        {children}
        {showPages && <Footer/>}
    </>
  )
}

export default NavFooterHider
