// "use client"
// import React from 'react'
// import { use, useState, useEffect } from 'react';
// import { ApiError } from '@/utils/ApiError';

// const Detail = ({ params }) => {

//     const [detail, setDetail] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const unwrappedParams = use(params);  // unwrap the Promise
//     const { slug } = unwrappedParams;
//     // console.log("Slug from params:", slug);
//     useEffect(() => {

//         async function fetchDetail() {

//             try {
//                 const res = await fetch(`/api/detail/findDetail/${slug}`);

//                 if (!res.ok) { throw new Error("Failed to fetch detail!") }

//                 const data = await res.json();

//                 setDetail(data.detail);
//             } catch (error) {
//                 setError(error.message)
//             } finally {
//                 setLoading(false)
//             }
//         }
//         fetchDetail();
//     }, [])

//     if (loading) return <p>Loading destinations...</p>
//     if (error) return <p className="text-red-600">Error: {error}</p>;

//     return (
//         <div className='h-[100vh]'>
//             <h1>{detail}</h1>
//         </div>
//     )
// }

// export default Detail



// const Detail = async ({ params }) => {
//   const { slug } = await params;  // directly access slug

//     try {
//         const res = await fetch(`/api/detail/findDetail/${slug}`);

//         if (!res.ok) {
//           throw new Error("Failed to fetch detail!");
//         }

//         const data = await res.json();
//         console.log(data);
//         const detail = data.detail; 
//         console.log("Detail:", detail);

//         return (
//             <div className='h-[100vh]'>
//                 <h1>{detail.title}</h1>
//             </div>
//         );

//     } catch (error) {
//         console.log("Error fetching detail:", error);
//     }
// };



const Detail = async ({ params }) => {
    const { slug } = await params;  // await params here

    // Now you can fetch data or pass slug to client components
    // For example, fetch detail data here (server component)

    const res = await fetch(`http://localhost:3000/api/detail/findDetail/${slug}`);
    const data = await res.json();
    //   console.log("Data : " , data);

    if (!res.ok) {
        throw new Error("Failed to fetch detail!");
    }

    const detail = data.data;
    //   console.log("Detail:", detail);

    return (
        <div className='mx-5 my-3'>
            <div className="p-5 flex justify-between items-center border-b">
                <div className="flex flex-col gap-2">
                    <h2 className="text-5xl font-bold malvides tracking-wider">{detail.title}</h2>
                    <p className="text-3xl poppins-black">{detail.description}</p>
                    <p className="font-medium text-gray-500">Price: <span className="text-gray-700">₹{detail.price}</span></p>
                </div>
                <div>
                    <p className="font-semibold"> <img width={20} className="inline-block" src="/globe.gif" alt="Globe Image" /> India</p>
                    <p className="font-semibold"> <img width={20} className="inline-block" src="/location.gif" alt="Location Image" /> {detail.location}</p>
                </div>

            </div>
            <div className="w-[65vw]">
                <div className="my-4">
                    <h2 className="text-2xl poppins-black">Tour Itinerary</h2>

                    {detail.itinerary.map((item) => (
                        <div key={item._id} className="bg-gray-100 px-5 py-2 mt-2">
                            <h3 className="font-semibold text-lg border-b py-1">Day {item.day} : {item.title} </h3>
                            <p className="text-gray-600 py-2">{item.activities}</p>
                            {item.activitiesPoints && item.activitiesPoints.length > 0 && (
                                <ul className="list-disc mt-2 px-5">
                                    {item.activitiesPoints.map((point, index) => (
                                        <li key={index} className="pt-2">{point}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}

                </div>
                <div className="grid grid-cols-2 my-5">
                    <div>
                        <h2 className="text-2xl poppins-black">Excludes</h2>
                        <ul className="list-disc px-8 text-lg mt-2">
                            {detail.includes.map((point, index) => (
                                <li key={index} className="pt-3">{point}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl poppins-black">Includes</h2>
                        <ul className="list-disc px-8 text-lg mt-2">
                            {detail.includes.map((point, index) => (
                                <li key={index} className="pt-3">{point}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl poppins-black">Packages</h2>
                    <table className="w-full border rounded-2xl mt-2">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="px-4 py-2">Package Type</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Duration</th>
                                <th className="px-4 py-2">Availability</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detail.packages.map((item) => (
                                <tr key={item._id} className="border-b">
                                    <td className="px-4 py-2">{item.type}</td>
                                    <td className="px-4 py-2">{item.price}</td>
                                    <td className="px-4 py-2">{item.startDate} <p className="text-sm text-gray-500">to {item.endDate}</p> </td>
                                    <td className="px-4 py-2">{item.durationDays}</td>
                                    <td className="px-4 py-2">{item.availability}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-5">
                    <h2 className="text-2xl poppins-black">Trip Highlights</h2>
                    <ul className="list-disc px-5 mt-2 text-lg">
                        {detail.tripHighlights.map((point, index) => (
                            <li key={index} className="pt-3">{point}</li>
                        ))}
                    </ul>
                </div>
                <div className="mt-5 bg-yellow-50 p-3">
                    <h2 className="text-xl poppins-black">Important Notes</h2>
                    <ul className="list-disc px-5 mt-2 text-lg">
                        {detail.importantNotes.map((note, index) => (
                            <li key={index} className="pt-3">{note}</li>
                        ))}
                    </ul>
                </div>
            </div>
            
            {/* Render other detail fields */}
        </div>
    );
};

export default Detail;
