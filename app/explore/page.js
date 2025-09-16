"use client"

import { useState, useEffect } from "react";
import React from 'react'
import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"], // add weights you need
});
function Destinations() {

    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchDestinations() {
            try {
                const res = await fetch("api/destination/all")

                if (!res.ok) { throw new ApiError(400, "Failed to fetch destinations") }

                const data = await res.json();

                setDestinations(data.destinations);
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchDestinations();
    }, [])

    console.log(destinations)
    if (loading) return <p>Loading destinations...</p>
    if (error) return <p className="text-red-600">Error: {error}</p>;

    return (
        <div className="mb-10">
            <h1 className="text-2xl font-bold mb-4 text-center  tracking-wide">Destinations</h1>
            <div className="flex flex-wrap gap-5 justify-start px-10">
                {destinations.map((destination) => {
                return (
                    <div key={destination._id}>
                        <div className=" bg-gray-200 inline-flex flex-col  p-2 rounded-2xl">
                            <div className="relative w-[359px] h-[290px]">
                                <Image
                                    // src="/cover-img1.jpg"
                                    src={destination.coverImage}
                                    layout="fill"
                                    alt="img"
                                    objectFit="cover"
                                    className="rounded-4xl"
                                />
                            </div>
                            <h2 className={` ${poppins} font-semibold text-md drop-shadow-[1px_1px_0_white] `}>{destination.title}: <span>{destination.description}</span> </h2>
                            <div className="flex items-center justify-between mt-2 ">
                                <div>
                                    <p className="font-bold text-xl tracking-wider ">₹{destination.price}</p>
                                    <p className="text-[12px] font-medium text-gray-600">{destination.days}-days package</p>
                                </div>
                                <div>
                                    <button className="bg-black text-white  px-3 py-1.5 rounded-full font-semibold cursor-pointer ">Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
            
        </div>
    );

}

export default Destinations
