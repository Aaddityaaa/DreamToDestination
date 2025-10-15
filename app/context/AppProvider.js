"use client"
import React,{createContext, useState} from 'react'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {

  const [price, setPrice] = useState(null)
  const [detailId, setDetailId] = useState(null)
  const [detailName, setDetailName] = useState(null)
  const [bookingId, setBookingId] = useState(null)

  return (
    <AppContext.Provider value={{price, setPrice, detailId, setDetailId, detailName, setDetailName, bookingId, setBookingId}}>
      {children}
    </AppContext.Provider>
  )
}
