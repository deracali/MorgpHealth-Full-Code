import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const InsuranceBanner = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center bg-blue-900 text-white py-10 px-6 lg:px-20 space-y-8 lg:space-y-0 lg:space-x-10">
      {/* Image Section */}
      <div className="w-full lg:w-1/2">
        <img
          src={assets.insurancedoc} // Replace with your image URL
          alt="Doctor"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          Protect your health with our insurance policy
        </h2>
        <p className="text-lg mb-6">
          At MegaHealth, we make it easy to get the coverage you need, when you
          need it. Our insurance plan is designed to give you peace of mind and
          easy access to quality healthcare.
        </p>
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg">
          Get insurance quote
        </button>
      </div>
    </div>
  );
};

export default InsuranceBanner;
