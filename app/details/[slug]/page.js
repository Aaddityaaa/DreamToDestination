"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { ApiError } from '@/utils/ApiError';

const Detail = ({ params }) => {

    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // const { slug } = params;
    useEffect(() => {

        async function fetchDetail() {

            try {
                const res = await fetch(`/api/detail/findDetail/kedarnath`)

                if (!res.ok) { throw new ApiError(400, "Failed to fetch detail!") }

                const data = await res.json();

                setDetail(data.detail);
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchDetail();
    }, [])

    if (loading) return <p>Loading destinations...</p>
    if (error) return <p className="text-red-600">Error: {error}</p>;

    return (
        <div className='h-[100vh]'>
            <h1>{detail}</h1>
        </div>
    )
}

export default Detail
