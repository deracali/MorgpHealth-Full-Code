import React from "react";
import { useNavigate } from "react-router-dom";
import { MdCheck } from "react-icons/md";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-5">
      <div className="flex items-center justify-center w-20 h-20 border-2 border-blue-500 rounded-full mb-5">
        <MdCheck size={40} className="text-blue-500" />
      </div>
      <p className="text-gray-600 text-lg text-center mb-7">Payment made successfully</p>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white text-lg font-bold py-3 px-8 rounded-md w-4/5"
      >
        Continue
      </button>
    </div>
  );
};

export default PaymentSuccess;
