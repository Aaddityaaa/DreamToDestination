"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { Poppins } from 'next/font/google'
import { ApiError } from '@/utils/ApiError'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'


const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"], // add weights you need
});

const Booking = () => {

    const router = useRouter();


    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [gender, setGender] = useState('')
    const [aadharCard, setAadharCard] = useState('')
    const [detail, setDetail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const res = await fetch('http://localhost:3000/api/booking/booktour', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ address, phoneNumber, aadharCard, gender, detail }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new ApiError(res.status, data.message || "Error while booking")
            }

            toast.success("Booking Pending!", {
                autoClose: 1000,
            })
            setSuccess("Booking Pending || Redirecting...")
            setLoading(false)
            setAadharCard("")
            setAddress("")
            setDetail("")
            setGender("")
            setPhoneNumber("")


            setTimeout(() => {
                router.push("/confirm-booking");
            }, 2000);
        } catch (error) {
            setLoading(false)
            setError(error.message || "Failed to booking. Please try again!")
        }

    }

    const isFormValid = address.trim() !== "" && gender.trim() !== "" && phoneNumber.trim().length == 10 && aadharCard.trim().length == 12;

    return (
        <div className='h-[85vh] w-[100vw]' style={{ backgroundImage: 'url("/login-bg21.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className='flex flex-col items-center justify-center h-full'>
                <h2 className={`${poppins.className} text-gray-50 text-2xl font-extrabold tracking-wider`}>Enter all the details for Booking</h2>
                {/* <p className='text-center text-gray-600 dark:text-gray-400'>Didn't have an account?{" "}
                <a href="/register" className='font-medium text-red-700 hover:text-red-400'>Sign up</a>
            </p> */}
                <form onSubmit={handleSubmit} className='mt-5'>
                    <div>
                        <label htmlFor="address" className='block text-sm font-medium text-gray-300'>Enter Address</label>
                        <div className='mt-1'>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                // autoComplete="address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className='block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none text-gray-200'
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="gender" className='block text-sm font-medium text-gray-300'>Gender</label>
                        <div className='mt-1'>
                            <input
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                id='gender'
                                name='gender'
                                required
                                type="text"
                                // autoComplete='current-phoneNumber' 
                                className='block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none text-gray-200' />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className='block text-sm font-medium text-gray-300'>Enter your Phone Number</label>
                        <div className='mt-1'>
                            <input
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                id='phoneNumber'
                                name='phoneNumber'
                                required
                                minLength={10}
                                maxLength={10}
                                onInvalid={(e) => e.target.setCustomValidity("Must be 10 digits!")}
                                onInput={(e) => e.target.setCustomValidity("")}
                                type="number"
                                // pattern='[0-9]{10}'

                                className='block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none text-gray-200' />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="aadharCard" className='block text-sm font-medium text-gray-300'>Enter your Aadhar Number</label>
                        <div className='mt-1'>
                            <input
                                value={aadharCard}
                                onChange={(e) => setAadharCard(e.target.value)}
                                id='aadharCard'
                                name='aadharCard'
                                minLength={12}
                                maxLength={12}
                                onInvalid={(e) => e.target.setCustomValidity("Must be 12 digits!")}
                                onInput={(e) => e.target.setCustomValidity("")}
                                required
                                type="number"
                                // pattern='[0-9]{12}'
                                className='block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none text-gray-200' />
                        </div>

                    </div>
                    <div>
                        <label htmlFor="detail" className='block text-sm font-medium text-gray-300'>Enter destination</label>
                        <div className='mt-1'>
                            <input
                                value={detail}
                                onChange={(e) => setDetail(e.target.value)}
                                id='detail'
                                name='detail'
                                required
                                type="text"
                                // pattern='[0-9]{12}'
                                className='block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none text-gray-200' />
                        </div>

                    </div>
                    <div className='mt-3 w-full'>
                        <button type='submit'
                            disabled={loading || !isFormValid} className={`w-full cursor-pointer flex justify-center py-2 px-4 text-sm font-medium text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                        ${loading || !isFormValid ? "bg-gray-400 cursor-not-allowed" : "bg-pink-800 hover:bg-pink-600"}`} >
                            {loading ? "Booking..." : "Enter"}</button>
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
    )
}

export default Booking
