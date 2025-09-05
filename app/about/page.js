import React from 'react';
import Spline from '@splinetool/react-spline';
import { Courgette } from "next/font/google";
import { Poppins } from 'next/font/google';
import Image from 'next/image';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // add weights you need
});

const courgette = Courgette({
  subsets: ["latin"],
  weight: ["400"], // Courgette only has one weight
});

const About = () => {
  return (
    <>
    <div className='grid grid-cols-2'>
        <div className=' h-[90vh]'>
            <div className={` ${courgette.className} flex flex-col items-center mt-5 gap-3`}>
                <h2 className='text-5xl font-extrabold text-[#3bb3e3]'>WELCOME</h2>
                <h2 className='text-2xl font-semibold'>🌏 Your Gateway To India's Beauty 🌏</h2>
                <h4 className='text-lg font-semibold'>Beacuse every trip tells a story</h4>
            </div>
            <div className='grid grid-cols-2 mt-10'>
                <div className='bg-gray-200 mx-2 p-5 text-center rounded-lg '>
                    <p className={`${poppins.className} font-semibold`}>We showcase India’s most stunning destinations, from world-famous landmarks to secret escapes only locals know. Our goal? To help you explore smarter, travel deeper, and fall in love with every journey.</p>
                </div>
                <div className='bg-gray-200 mx-2 p-5 text-center rounded-lg'>
                    <p className={`${poppins.className} font-semibold`}>From planning your perfect itinerary to uncovering places you’ve never heard of, Dream to Destination is your trusted travel companion. Because we don’t just take you places — we take you closer to your dreams.</p>
                </div>
            
            </div>
        </div>
        <div className='h-[90vh] relative'>
            <Image src="/about/bg-img.png" fill alt='bg-img'
            className='opacity-70'/>
            <div className='absolute h-full w-full'>
                <div className='h-full'>
                    <iframe src='https://my.spline.design/greetingrobot-yET1lCteDqeclAEAsregbjK7/' frameBorder='0' width='100%' height='100%'></iframe>
                    <p className='text-3xl font-bold absolute top-30 left-4/5 -translate-x-1/2'>Namastey</p>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default About;

