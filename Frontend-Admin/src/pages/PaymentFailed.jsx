import React from "react";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-5">
      <div className="flex items-center justify-center w-20 h-20 border-2 border-red-500 rounded-full mb-5">
        <MdCancel size={40} className="text-red-500" />
      </div>
      <p className="text-gray-600 text-lg text-center mb-7">Payment failed. Please try again.</p>
      <button
        onClick={() => navigate("/")}
        className="bg-red-500 text-white text-lg font-bold py-3 px-8 rounded-md w-4/5"
      >
        Retry Payment
      </button>
      <button
        onClick={() => navigate("/home")}
        className="mt-4 bg-gray-300 text-gray-800 text-lg font-bold py-3 px-8 rounded-md w-4/5"
      >
        Go to Home
      </button>
    </div>
  );
};

export default PaymentFailed;
