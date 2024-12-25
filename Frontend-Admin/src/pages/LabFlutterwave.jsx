import React from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useParams, useNavigate } from "react-router-dom";

const LabFlutterWave = () => {
  // Extract docName and userName from URL parameters
  const { docName,docEmail,fee,userName,userEmail,appointmentId } = useParams();
  const navigate = useNavigate();

  // Configure Flutterwave payment
  const config = {
    public_key: "FLWPUBK-a567006323e795f4ca6ca9761cff3365-X", // Replace with your actual public key
    tx_ref: Date.now().toString(), // Unique transaction reference
    amount: fee, // Replace with the actual payment amount
    currency: "USD",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: userEmail, // Replace with actual email
      phone_number: "1234", // Replace with actual phone number
      name: userName, // User's name from URL params
    },
    customizations: {
      title: "Morgp Health",
      description: `Lab and Prescription update result Payment for ${userName}, ${appointmentId}`, // Payment description with doctor's name
      logo: "https://i.imgur.com/ci92tNL.png", // Replace with your logo URL
    },
  };

  // Initialize Flutterwave payment
  const flutterwavePayment = useFlutterwave(config);

  // Handle the payment process
  const handlePayment = () => {
    flutterwavePayment({
      callback: (response) => {
        console.log(response); // Log the payment response
        if (response.status === "successful") {
          // Payment successful
          navigate("/success"); // Navigate to the success page
        } else {
          // Payment failed
          alert("Payment failed. Please try again.");
        }
        closePaymentModal(); // Close the payment modal after response
      },
      onClose: () => {
        console.log("Payment modal closed.");
      },
    });
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
          {/* User Info */}
          <div className="flex items-center">
            
            <div className="text-left">
              <p className="text-[#334155] font-semibold">{name}</p>
              <p className="text-[#94a3b8] text-sm">{email}</p>
            </div>
          </div>

          {/* Amount */}
          <div className="mt-6">
            <h1 className="text-[#0bbf69] text-5xl font-extrabold">
              ${docFees}<span className="text-2xl"></span>
            </h1>
          </div>

          {/* Payment Method */}
          <div className="mt-6 text-left">
            <p className="text-[#64748b] text-xs uppercase font-medium">
              Payment Method
            </p>
            <div className="flex items-center bg-white rounded-lg shadow-md p-4 mt-2">
              <img
                src="https://seeklogo.com/images/V/VISA-logo-F3440F512B-seeklogo.com.png"
                alt="Visa"
                className="w-12 h-auto mr-4"
              />
              <div>
                <p className="text-[#1e293b] font-semibold text-sm">
                  Credit / Debit Card
                </p>
               
              </div>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          className="mt-8 px-6 py-3 bg-[#0bbf69] text-white rounded-lg shadow-lg uppercase font-semibold tracking-wide"
        >
          Pay Now
        </button>

        {/* Tags */}
        <div className="flex justify-center space-x-3 mt-6">
          <span className="uppercase text-xs font-medium bg-[#0bbf69] text-white px-3 py-1 rounded-full">
            Pay
          </span>
          <span className="uppercase text-xs font-medium bg-[#f1f5f9] text-[#64748b] px-3 py-1 rounded-full">
            #123456789
          </span>
        </div>
      </div>
    </div>
  );
};

export default LabFlutterWave;



