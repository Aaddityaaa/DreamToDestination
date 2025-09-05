import React from 'react'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});

const Footer = () => {
    return (
        <div className="relative h-screen width: calc(100vw - var(--scrollbar-width));">
            {/* Background gradient */}
            <div className="absolute top-0 z-[-2] h-screen w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>

            <div className={`${poppins.className}  h-[50vh]  text-white flex items-center justify-between px-5`}>
                <div className='flex flex-col gap-3'>
                    <h2 className='font-extrabold text-4xl'>Turn your Manifestation</h2>
                    <h2 className='font-extrabold text-4xl text-[#737373]'> into reality with Us!</h2>
                    <div className='mt-3 flex gap-3 text-[#737373]'>
                        <button className='border-2 px-4 py-1 rounded-full cursor-pointer'>Youtube</button>
                        <button className='border-2 px-4 py-1 rounded-full cursor-pointer'>Instagram</button>
                        <button className='border-2 px-4 py-1 rounded-full cursor-pointer'>Phone</button>
                        <button className='border-2 px-4 py-1 rounded-full cursor-pointer'>Linkdin</button>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <h2 className='font-extrabold text-4xl'>Memories are Waiting</h2>
                    <h2 className='font-extrabold text-4xl text-[#737373]'>let's make them together!</h2>
                    <div className='mt-3 flex justify-end'>
                        <button className='border-2 px-8 py-2 rounded-full cursor-pointer bg-white text-black'>Upcoming trips &gt;&gt;</button>
                    </div>
                </div>
            </div>
            <div className='text-white h-[50vh]'>
                <div className='w-full h-[1.5px] bg-white opacity-20'></div>
                <div className='grid grid-cols-4 '>
                    <div className='px-5 my-5 '>
                        <p className='font-bold text-xl'>Explore</p>
                        <ul className='mt-5 mx-2'>
                        <li>Upcoming Trips</li>
                        <li>Weekend Trips</li>
                        <li>Long Weekend</li>
                        <li>Travel Blogs</li>
                    </ul>
                    </div>
                    <div className='px-5 my-5 '>
                        <p className='font-bold text-xl'>About us</p>
                        <ul className='mt-5 mx-2'>
                        <li>Our Story</li>
                        <li>Careers</li>
                        <li>Long Weekend</li>
                        <li>Travel Blogs</li>
                    </ul>
                    </div>
                    <div className='px-5 my-5 '>
                        <p className='font-bold text-xl'>Terms & Info</p>
                        <ul className='mt-5 mx-2'>
                        <li>Terms & Conditions</li>
                        <li>Privacy</li>
                        <li>Cancellation</li>
                    </ul>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-5'>
                        <button className='px-8 py-2 rounded-full cursor-pointer bg-red-400 '>Login</button>
                        <p className='font-medium'>Can't wait to see you with us.</p>
                    </div>
                    <div className='bg-gray-800 absolute bottom-0 w-full h-[8vh] flex items-center justify-center cursor-not-allowed'>
                        <p>© 2025 RAAHGIR TRAVELS PRIVATE LIMITED | All Rights Reserved.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Footer
