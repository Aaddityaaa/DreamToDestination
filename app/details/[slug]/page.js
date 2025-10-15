"use client"
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'next/navigation';
import WebsiteLoader from '@/components/Loader';
import { AppContext } from '@/app/context/AppProvider';
import { useRouter } from 'next/navigation';

const Detail = () => {

    const router = useRouter();

    const params = useParams();
    const slug = params.slug;
    // console.log(slug)

    const { setPrice, setDetailId, setDetailName } = useContext(AppContext)

    const [detail, setDetail] = useState({
        itinerary: [],
        includes: [],
        packages: [],
        tripHighlights: [],
        importantNotes: [],
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedPackageId, setSelectedPackageId] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);

    useEffect(() => {
        const fetchDetail = async (slug) => {
            try {
                const res = await fetch(`http://localhost:3000/api/detail/findDetail/${slug}`);

                if (!res.ok) {
                    throw new Error("Failed to fetch detail!");
                }
                const data = await res.json();
                //   console.log("Data : " , data);
                //   console.log(data.data._id)
                setDetailId(data.data._id)
                setDetailName(data.data.title)
                setDetail(data.data)
            } catch (error) {
                setError(error.message);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        }
        if (slug) {
            fetchDetail(slug)
        }

    }, [])

    const handleClick = (item) => {
        setSelectedPackageId(item._id)
        setSelectedPrice(item.price)
        // console.log("Clicked package: ", item);

    }

    const handleBooking = () => {
        setPrice(selectedPrice)
        setTimeout(() => {
            router.push("/booking")
        }, 1000);
    }
    if (loading) return <WebsiteLoader isLoading={loading} />;
    if (error) return <p className="text-red-600">Error: {error}</p>;


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
            <div className="flex gap-2">
                <div className="w-[65vw]">
                    {detail.itinerary && <div className="my-4">
                        <h2 className="text-2xl poppins-black">Tour Itinerary</h2>

                        {detail.itinerary.map((item) => (
                            <div key={item._id} className="bg-gray-100 px-5 py-2 mt-2">
                                <h3 className="font-semibold text-lg border-b py-1">Day {item.day} : {item.title} </h3>
                                {/* <p className="text-gray-600 py-2">{item.activities}</p> */}
                                {item.activities && <p className="text-gray-600 py-2">{item.activities}</p>}
                                {item.activitiesPoints && item.activitiesPoints.length > 0 && (
                                    <ul className="list-disc mt-2 px-5">
                                        {item.activitiesPoints.map((point, index) => (
                                            <li key={index} className="pt-2">{point}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}

                    </div>}

                    <div className="grid grid-cols-2 my-5">
                        {detail.includes && <div>
                            <h2 className="text-2xl poppins-black">Includes</h2>
                            {detail.includes && detail.includes.length > 0 && (
                                <ul className="list-disc px-8 text-lg mt-2">
                                    {detail.includes.map((point, index) => (
                                        <li key={index} className="pt-3">{point}</li>
                                    ))}
                                </ul>
                            )}
                        </div>}
                        {detail.excludes && <div>
                            <h2 className="text-2xl poppins-black">Excludes</h2>
                            {detail.excludes && detail.excludes.length > 0 && (
                                <ul className="list-disc px-8 text-lg mt-2">
                                    {detail.excludes.map((point, index) => (
                                        <li key={index} className="pt-3">{point}</li>
                                    ))}
                                </ul>
                            )}
                        </div>}
                    </div>
                    {detail.packages && <div>
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
                    </div>}
                    {detail.tripHighlights && <div className="mt-5">
                        <h2 className="text-2xl poppins-black">Trip Highlights</h2>
                        <ul className="list-disc px-5 mt-2 text-lg">
                            {detail.tripHighlights.map((point, index) => (
                                <li key={index} className="pt-3">{point}</li>
                            ))}
                        </ul>
                    </div>}
                    {detail.importantNotes && <div className="mt-5 bg-yellow-50 p-3">
                        <h2 className="text-xl poppins-black">Important Notes</h2>
                        <ul className="list-disc px-5 mt-2 text-lg">
                            {detail.importantNotes.map((note, index) => (
                                <li key={index} className="pt-3">{note}</li>
                            ))}
                        </ul>
                    </div>}
                </div>
                <div className="w-[33vw] h-[100vh] border rounded-2xl mt-10 sticky top-2">
                    <h2 className="text-xl poppins-black py-2 bg-black text-white rounded-t-2xl h-20 flex items-center justify-center">Book this tour</h2>
                    <div className="p-5 border-b ">

                        <p className="font-bold text-3xl">₹{selectedPrice}</p>
                    </div>

                    <div className="px-5">
                        <h2 className="text-xl poppins-black py-5">Tour options</h2>
                        {detail.packages.map((item) => (
                            <div key={item._id}
                                onClick={() => handleClick(item)}
                                className="border py-2 px-4 my-3 flex items-center justify-between rounded-lg cursor-pointer "
                                style={{ backgroundColor: selectedPackageId === item._id ? 'lightyellow' : 'white', }}>
                                <div className="font-semibold text-lg">{item.type}</div>
                                <div className="font-semibold">₹{item.price}</div>
                            </div>
                        ))}

                        <button
                            onClick={handleBooking}
                            disabled={!selectedPrice}
                            className="w-full py-3 mt-5 bg-black text-white rounded-full font-bold text-xl cursor-pointer hover:bg-[#5bc1d5] border-black border-2">
                            Book Now
                        </button>
                    </div>


                </div>
            </div>


        </div>

    );
};

export default Detail;