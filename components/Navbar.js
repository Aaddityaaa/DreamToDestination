"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { gsap } from 'gsap'

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
      } finally {
        setLoading(false)
      }
    }
    fetchCurrentUser()

    const tl = gsap.timeline()
    tl.from('.logo', {
      y: -30,
      opacity: 0,
      duration: 0.5,
      // delay: 1.5
    })
    tl.from('.lis', {
      y: -30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.2
    })
    tl.from('.btn', {
      y: -30,
      opacity: 0,
      duration: 0.5,
      // stagger: 0.2
    })

  }, [])

  const handleLogout = async () => {
    try {
      const res = await fetch("api/v1/users/logout", {
        method: "POST"
      })

      if (res.ok) {
        toast.success("Logout successful!", {
          autoClose: 1000,
        })
        setUser(null)
      } else {
        alert("failed to logout!")
      }

    } catch (error) {
      alert("failed to logout!", error)
    }
  }



  return (
    <div className='bg-black w-full px-2 text-white flex justify-between'>
      <div className="logo px-3">
        <Link href="/"><Image src="/logo.png" width={70} height={70} alt='logo' /></Link>
      </div>
      <ul className='flex justify-center items-center'>
        <Link href="/"><li className={`lis hover:bg-[#c7cfda] hover:text-[#3bb3e3] px-3 py-1.5 rounded-lg font-medium text-lg ${pathName === "/" ? "text-[#3bb3e3]" : ""}`}>Home</li></Link>
        <Link href="/explore"><li className={`lis hover:bg-[#c7cfda] hover:text-[#3bb3e3] px-3 py-1.5 rounded-lg font-medium text-lg ${pathName === "/explore" ? "text-[#3bb3e3]" : ""}`}>Explore</li></Link>
        <Link href="/"><li className={`lis hover:bg-[#c7cfda] hover:text-[#3bb3e3] px-3 py-1.5 rounded-lg font-medium text-lg ${pathName === "/categories" ? "text-[#3bb3e3]" : ""}`}>Categories</li></Link>
        <Link href="/about"><li className={`lis hover:bg-[#c7cfda] hover:text-[#3bb3e3] px-3 py-1.5 rounded-lg font-medium text-lg ${pathName === "/about" ? "text-[#3bb3e3]" : ""}`}>About</li></Link>
        {
          user && user.role === 'admin' && <Link href="/admin"><li className={`lis hover:bg-[#c7cfda] hover:text-[#3bb3e3] px-3 py-1.5 rounded-lg font-medium text-lg ${pathName === "/admin" ? "text-[#3bb3e3]" : ""}`}>Admin</li></Link>
        }

      </ul>
      <div className='flex justify-center items-center px-2 gap-2 btn'>
        {loading ? (
          <p>Loading ...</p>
        ) : user ? (
          <>
            <span>Hello, </span><span className='underline btns '>
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
