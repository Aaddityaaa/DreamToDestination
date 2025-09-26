"use client"
import React from 'react'
import { useState } from 'react'
import { Poppins } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { ApiError } from '@/utils/ApiError';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"], // add weights you need
});    

const Login = () => {

    const router = useRouter();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const res = await fetch("/api/v1/users/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()
            if (!res.ok) {
                throw new ApiError(res.status, data.message || "Error while logging in!");
            }
            toast.success("Login successful!",{
                autoClose: 1000,
            })
            setSuccess("Login successful || Redirecting...")
            setLoading(false)
            setEmail("")
            setPassword("")

            // Redirect to home page after a short delay
            setTimeout(() => {
                router.push("/");
            }, 2000);
        } catch (error) {
            setLoading(false)
            setError(error.message || "Failed to login. Please try again!")
        }
    }

    const isFormValid = email.trim() !== "" && password.trim() !== "";

    return (
        <div className='flex'>
            <div className='bg-[#f8f9fa] h-[100vh] w-[30vw]'>
                <div className="logo px-3 inline-block">
                    <Link href="/"><Image src="/logo.png" width={70} height={70} alt='logo'/></Link>
                </div>
                <div className='flex flex-col items-center justify-center h-full'>
                    <h2 className={`${poppins.className} text-2xl font-extrabold tracking-wider`}>Sign in to your account</h2>
                    <p className='text-center text-gray-600 dark:text-gray-500'>Didn't have an account?{" "}
                        <a href="/register" className='font-medium text-blue-600 hover:text-blue-400'>Sign up</a>
                    </p>
                    <form onSubmit={handleSubmit} className='mt-5'>
                        <div>
                            <label htmlFor="email" className='block text-sm font-medium text-gray-800'>Email address</label>
                            <div className='mt-1'>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none '
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className='block text-sm font-medium text-gray-800'>Password</label>
                            <div className='mt-1'>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} id='password' name='password' required type="password" autoComplete='current-password' className='block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none ' />
                            </div>
                        </div>
                        <div className='mt-3 w-full'>
                            <button type='submit'
                                disabled={loading || !isFormValid} className={`w-full cursor-pointer flex justify-center py-2 px-4 text-sm font-medium text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                                ${loading || !isFormValid ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`} >
                                {loading ? "Signing in..." : "Sign in"}</button>
                        </div>
                    </form>
                    {error && (
                        <div className='p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'>
                            {error} </div>
                    )}
                    {success && (
                        <div className='p-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800'>
                            {success} </div>
                    )}
                </div>
            </div>
            <div className='relative h-[100vh] w-[70vw]'>
                <Image src="/login-bg.png" fill alt="Background image" className='absolute'
                style= {{objectFit: "cover"}} />
            </div>
        </div>
    )
}

export default Login
