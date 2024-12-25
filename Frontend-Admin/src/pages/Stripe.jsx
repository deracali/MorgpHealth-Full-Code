import React from "react";
import { useParams } from "react-router-dom";
import {loadStripe} from "@stripe/stripe-js";
const Stripe = () => {
  const { docName, userName, userEmail, docFees } = useParams();

  const handleToken = async () => {
    const stripe = await loadStripe("pk_test_51QN8mWG2ozhLuxUAf8fdoD3MqAQnfNsZZoZdbc1fRx1fHUWRbpLjbGfdeR5VEAGOVCAUqH9hrlaJPQ5lEpAmrt7q00kPKajlEa");
    
    const response = await fetch('https://morgphealth.onrender.com/create-intent', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseInt(docFees) * 100,docName,userName, userEmail }), // Send fees in cents
    });

    const session = await response.json();

    if (session.id) {
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.error('Stripe Checkout Error:', result.error.message);
        }
    } else {
        console.error('Session ID not received:', session);
    }
};

  return (
    <div className="bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] mx-auto mt-10 p-8 rounded-lg shadow-lg font-sans">
    <div className="bg-white w-full rounded-lg p-8 text-center relative shadow-xl">
      {/* Success Icon */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-[90px] h-[90px] rounded-full bg-[#f5f7fa] flex items-center justify-center border-4 border-white shadow-md">
        <i className="text-[#0bbf69] text-4xl fas fa-check"></i>
      </div>
  
      {/* Main Message */}
      <h1 className="text-[#1e293b] font-bold text-xl mt-8">
        Payment Complete
      </h1>
      <p className="text-[#64748b] text-sm font-medium mt-2">
        Thank you for your transfer
      </p>
  
      {/* Payment Details */}
      <div className="bg-[#f9fafb] rounded-lg mt-8 p-6">
        <h1 className="text-xl font-bold mb-4">Doctor: {docName}</h1>
        
        {/* User Info */}
        <div className="flex items-center">
          <div className="text-left">
            <p className="text-[#334155] font-semibold">{userName}</p>
            <p className="text-[#94a3b8] text-sm">{userEmail}</p>
          </div>
        </div>
  
        {/* Fees */}
        <div className="mt-6">
          <h1 className="text-[#0bbf69] text-5xl font-extrabold">
            ${docFees}
            <span className="text-2xl">.00</span>
          </h1>
        </div>
  
        {/* Stripe Checkout Button */}
        {/* <StripeCheckout
          name="Doctor Appointment"
          description={`${userEmail} Appointment Payment for Dr. ${docName}`}
          amount={parseInt(docFees) * 100} // Convert fees to cents
          token={handleToken} // Function to handle token after Stripe checkout
          stripeKey="pk_test_51QN8mWG2ozhLuxUAf8fdoD3MqAQnfNsZZoZdbc1fRx1fHUWRbpLjbGfdeR5VEAGOVCAUqH9hrlaJPQ5lEpAmrt7q00kPKajlEa" // Replace with your Stripe public key
          currency="USD" // Currency in USD
        >
          <button className="mt-8 bg-[#0bbf69] text-white px-8 py-3 rounded-full text-xl">
            Pay Now
          </button>
        </StripeCheckout> */}
  
        {/* Tags */}
        <div className="flex justify-center space-x-3 mt-6">
          <button onClick={handleToken} className="uppercase text-xs font-medium bg-[#0bbf69] text-white px-3 py-1 rounded-full">
            Pay
          </button>
          <span className="uppercase text-xs font-medium bg-[#f1f5f9] text-[#64748b] px-3 py-1 rounded-full">
            #123456789
          </span>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Stripe;
