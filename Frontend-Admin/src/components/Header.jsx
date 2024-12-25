import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets_frontend/assets';
import { AppContext } from '../context/AppContext';

export default function Header() {
  const { userData } = useContext(AppContext);
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between bg-white px-6 lg:px-16 py-10 gap-10">
      {/* Left Side - Text and Buttons */}
      <div className="lg:w-1/2 flex flex-col items-start justify-center gap-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug">
          Insurance, <span className="text-blue-500">Appointments,</span> <br /> Prescriptions.
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mt-4">
    All in One Place. Simplify your healthcare journey with seamless access to the services you need.
  </p>
  <p className="text-gray-600 text-sm sm:text-base mt-2">
    Manage your health effortlessly, book doctor appointments, track prescriptions, and stay covered—all from one platform designed with you in mind.
  </p>
        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <Link
            to="/insurance"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full transition duration-300"
          >
            Buy Insurance
          </Link>
          { userData ?  <Link
            to="/doctors"
            className="border-2 border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 py-3 px-6 rounded-full transition duration-300"
          >
            Book Appointment
          </Link> : ""}
         
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="lg:w-1/2 flex items-center justify-center">
        <img
          src={assets.heroimg}
          alt="Doctors"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
