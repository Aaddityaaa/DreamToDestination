"use client"
import React, { useState, useContext } from 'react'
import { Poppins } from 'next/font/google'
import { ApiError } from '@/utils/ApiError';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppProvider';
import { useRouter } from 'next/navigation';

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"], // add weights you need
});


const confimBooking = () => {

    const router = useRouter();
    const { price, setBookingId } = useContext(AppContext)

    // console.log("Price :", price)

    const [email, setEmail] = useState('')
    const [enteredOTP, setEnteredOTP] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const res = await fetch("http://localhost:3000/api/booking/confirmtour", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, enteredOTP }),
            });

            const data = await res.json()
            // console.log("Booking Id: ",data.data._id);
            const bookingId = data.data._id;

            if (!res.ok) {
                throw new ApiError(res.status, data.message || "Error while booking")
            }
            setBookingId(bookingId);

            toast.success("Booking Approved!", {
                autoClose: 1000,
            })

            setSuccess("Booking Approved || Redirecting...")
            setLoading(false)
            setEmail("")
            setEnteredOTP("")

            setTimeout(() => {
                router.push("/payment");
            }, 2000);

        } catch (error) {
            setLoading(false)
            setError(error.message || "Failed in booking. Please try again!")
        }
    }

    const isFormValid = email.trim() != '' && enteredOTP.trim().length == 6;
    return (
        <div className='h-[85vh] w-[100vw]' style={{ backgroundImage: 'url("/login-bg21.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className='flex flex-col items-center justify-center h-full'>
                <h2 className={`${poppins.className} text-gray-50 text-2xl font-extrabold tracking-wider`}>Enter all the details for Booking</h2>
                {/* <p className='text-center text-gray-600 dark:text-gray-400'>Didn't have an account?{" "}
                <a href="/register" className='font-medium text-red-700 hover:text-red-400'>Sign up</a>
            </p> */}
                <form onSubmit={handleSubmit} className='mt-5'>
                    <div>
                        <label htmlFor="email" className='block text-sm font-medium text-gray-300'>Enter Email</label>
                        <div className='mt-1'>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                // autoComplete="otp"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none text-gray-200'
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="enteredOTP" className='block text-sm font-medium text-gray-300'>Enter otp</label>
                        <div className='mt-1'>
                            <input
                                id="enteredOTP"
                                name="enteredOTP"
                                type="text"
                                // autoComplete="otp"
                                required
                                value={enteredOTP}
                                onChange={(e) => setEnteredOTP(e.target.value)}
                                className='block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none text-gray-200'
                            />
                        </div>
                    </div>

                    <div className='mt-3 w-full'>
                        <button type='submit'
                            disabled={loading || !isFormValid} className={`w-full cursor-pointer flex justify-center py-2 px-4 text-sm font-medium text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                        ${loading || !isFormValid ? "bg-gray-400 cursor-not-allowed" : "bg-pink-800 hover:bg-pink-600"}`} >
                            {loading ? "Booking..." : "Confirm"}</button>
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

export default confimBooking
