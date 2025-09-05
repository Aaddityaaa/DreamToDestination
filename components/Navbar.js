"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Navbar = () => {

    const pathName = usePathname()

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    //fetch the currrent user
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
              const res = await fetch("/api/v1/users/current")
              
              if (!res.ok) {
                  setUser(null)
              } else {
                  const data = await res.json()
                  // console.log(data)
                  setUser(data.data.user)
              }
            } catch (error) {
              setUser(null)
            }finally{
              setLoading(false)
            }
        }
        fetchCurrentUser()
    }, [])

    const handleLogout = async () => {
      try{
        const res = await fetch("api/v1/users/logout", {
          method: "POST"
        })

        if(res.ok){
          setUser(null)
        }else{
          alert("failed to logout!")
        }

      }catch(error){
        alert("failed to logout!", error)
      }
    }

  return (
    <div className='bg-black w-full px-2 text-white flex justify-between'>
      <div className="logo px-3">
        <Link href="/"><Image src="/logo.png" width={70} height={70} alt='logo'/></Link>
      </div>
      <ul className='flex justify-center items-center'>
        <Link href="/"><li className={`hover:bg-[#c7cfda] hover:text-[#3bb3e3] px-3 py-1.5 rounded-lg font-medium text-lg ${pathName === "/" ? "text-[#3bb3e3]" : ""}`}>Home</li></Link>
        <Link href="/"><li className={`hover:bg-[#c7cfda] hover:text-[#3bb3e3] px-3 py-1.5 rounded-lg font-medium text-lg ${pathName === "/explore" ? "text-[#3bb3e3]" : ""}`}>Explore</li></Link>
        <Link href="/"><li className={`hover:bg-[#c7cfda] hover:text-[#3bb3e3] px-3 py-1.5 rounded-lg font-medium text-lg ${pathName === "/categories" ? "text-[#3bb3e3]" : ""}`}>Categories</li></Link>
        <Link href="/about"><li className={`hover:bg-[#c7cfda] hover:text-[#3bb3e3] px-3 py-1.5 rounded-lg font-medium text-lg ${pathName === "/about" ? "text-[#3bb3e3]" : ""}`}>About</li></Link>
        {
          user && user.role === 'admin' && <Link href="/admin"><li className={`hover:bg-[#c7cfda] hover:text-[#3bb3e3] px-3 py-1.5 rounded-lg font-medium text-lg ${pathName === "/admin" ? "text-[#3bb3e3]" : ""}`}>Admin</li></Link>
        }
        
      </ul>
      <div className='flex justify-center items-center px-2 gap-2'>
        {loading ? (
          <p>Loading ...</p>
        ) :  user ? (
          <>
            <span>Hello, </span><span className='underline'>
              {user.username || user.email}</span>
            <button onClick={handleLogout} className='bg-[#d4dae3] px-4 py-2 rounded-lg font-medium text-lg text-black cursor-pointer'>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login"><button className='bg-[#d4dae3] px-4 py-2 rounded-lg font-medium text-lg text-black cursor-pointer'>Sign in</button></Link>

            <Link href="/register"><button className='bg-[#3bb3e3] px-4 py-2 rounded-full font-medium text-lg cursor-pointer'>Sign up</button></Link>
          </>
        )}
        
        
      </div> 
    </div>
  )
}

export default Navbar
