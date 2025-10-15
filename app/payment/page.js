"use client"
import React, { useContext } from 'react'
import { AppContext } from '../context/AppProvider';
import Script from 'next/script';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Payment = () => {

    const router = useRouter()

    const { price, bookingId } = useContext(AppContext)
    

    const amount = (price * 100);
    const currency = "INR";
    const receiptId = "qwser1"

    const paymentHandler = async (e) => {
        e.preventDefault();

        if (typeof window === 'undefined' || !window.Razorpay) {
            alert("Razorpay SDK not loaded. Are you online?");
            return;
        }
        try {
            const response = await fetch("http://localhost:3000/api/booking/payment", {
                method: "POST",
                body: JSON.stringify({
                    amount,
                    currency,
                    receipt: receiptId,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                alert("Failed to create order!");
                return;
            }
            const order = await response.json()
            // console.log("Order created : ", order)

            var options = {
                "key": "rzp_test_RSo3qtpGN8Z84g",
                amount,
                currency,
                "name": "RazorPay",
                "description": "Test Transaction",
                "image": "https://example.com",
                "order_id": order.id,
                "handler": async function (response) {
                    const body = {
                        ...response,
                        bookingId
                    };

                    const validateResponse = await fetch("http://localhost:3000/api/booking/verify-payment", {
                        method: "POST",
                        body: JSON.stringify(body,bookingId),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    const verificationData = await validateResponse.json()
                    // console.log(verificationData)
                    if (verificationData.verified) {
                        alert("Payment successfull!!")
                        console.log("✅ Payment Successful!");
                        toast.success("Payment successful!", {
                            autoClose: 1000,
                        })
                        toast.success("Booking successful!", {
                            autoClose: 1000,
                        })
                    } else {
                        alert("Payment verification failed!")
                    }

                    setTimeout(() => {
                        router.push("/");
                    }, 2000);
                },
                "prefill": {
                    "name": "Tamanna",
                    "email": "teewrites@gamil.com",
                    "contact": "9125257003"
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response) {
                alert(response.error.code)
                alert(response.error.description)
                alert(response.error.source)
                alert(response.error.step)
                alert(response.error.reason)
                alert(response.error.metadata.order_id)
                alert(response.error.metadata.payment_id)
            });
            rzp1.open();
        } catch (error) {
            console.error("Payment Handler Error:", error);
            alert("An error occurred during payment. Please try again.");
        }


    }

    return (
        <>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />


            < div className='h-[85vh] flex justify-center items-center' style={{ backgroundImage: 'url("/login-bg21.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className='bg-red-200 px-15 py-6 flex flex-col justify-center items-center gap-5 rounded-3xl'>
                    <h2 className='text-3xl  font-bold malvides'>Welcome to Payment gateway</h2>
                    <p className='text-gray-500 text-sm  font-medium'>Pay the Price to Successfully Book Your Tour</p>
                    <div className='flex items-center gap-4'>
                        <img className='w-8' src="/payment-coin.gif" alt="coin" />
                        <p className='text-gray-800 text-md font-medium'>Amount: <span className='text-blue-500'>₹{price}</span></p>
                        <img className='w-8' src="/payment-coin.gif" alt="coin" />
                    </div>
                    <button onClick={paymentHandler} className='bg-[#3bb3e3] px-8 cursor-pointer py-1 text-md font-semibold rounded-lg text-white'>Pay</button>
                </div>
            </div >
        </>

    )
}

export default Payment
