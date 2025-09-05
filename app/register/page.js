"use client"
import React from 'react'
import { useState } from 'react'
import { Poppins } from 'next/font/google';
import { ApiError } from '@/utils/ApiError';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"], // add weights you need
});

const register = () => {

    const router = useRouter();

    const [username, setUsername] = useState("")
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
            const res = await fetch("/api/v1/users/register", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            })

            const data = await res.json()
            if (!res.ok) {
                const errorData = await res.json();
                throw new ApiError(res.status, errorData.message || "Error while registering the user!");
            }

            setSuccess("Registration successful || Redirect to login...")
            setLoading(false)
            setEmail("")
            setUsername("")
            setPassword("")

            // Redirect to login page after a short delay
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (error) {
            setLoading(false)
            setError(error.message || "Failed to register. Please try again!")
        }
    };

    const isFormValid = username.trim() !== "" && email.trim() !== "" && password.trim() !== "";

    return (
            <div className='flex'>
                <div className='bg-[#f8f9fa] h-[100vh] w-[30vw]'>
                <div className='flex flex-col items-center justify-center h-full'>
                    <h2 className={`${poppins.className} text-2xl font-extrabold tracking-wider`}>Create an account</h2>
                    <p className='text-center text-gray-600 dark:text-gray-500'>Already have an account?{" "}
                        <a href="/login" className='font-medium text-blue-600 hover:text-blue-400'>Sign in</a>
                    </p>
                    <form onSubmit={handleSubmit} className='mt-5'>
                        <div>
                            <label htmlFor="username" className='block text-sm font-medium text-gray-800'>Username</label>
                            <div className='mt-1'>
                                <input value={username} onChange={(e) => setUsername(e.target.value)} id='username' name='username' required type="text" className='block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none ' />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className='block text-sm font-medium text-gray-800'>Email address</label>
                            <div className='mt-1'>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} id='email' name='email' required type="email" autoComplete='email' className='block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none ' />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className='block text-sm font-medium text-gray-800'>Password</label>
                            <div className='mt-1'>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} id='password' name='password' required type="password" autoComplete='current-password' minLength={8} className='block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none ' />
                            </div>
                        </div>
                        <div className='mt-3 w-full'>
                            <button type='submit' 
                            disabled={loading || !isFormValid}
                             className={`w-full cursor-pointer flex justify-center py-2 px-4 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 ${loading || !isFormValid  ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`} >{loading ? "Registering..." : "Register"}</button>
                        </div>
                    </form>
                    {error && (
                        <div className='mt-5 p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'>
                            {error} </div>
                    )}
                    {success && (
                        <div className='mt-5 p-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800'>
                            {success} </div>
                    )}
                </div>
            </div>
            <div className='relative h-[100vh] w-[70vw]'>
                <Image src="/bg.avif" fill alt="Background image" className='absolute' />
            </div>
            </div>

    )
}

export default register
