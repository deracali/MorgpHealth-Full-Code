import React from 'react';

const CustomerSupport = () => {
  return (
    <section className="w-full py-12 px-6 bg-white text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Customer support at your fingertip
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-10">
        Our support team is dedicated to helping you find the best specialists, saving you time and energy.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-4xl font-bold text-blue-600">2050+</span>
          <p className="text-gray-600 mt-2">Satisfied customers</p>
        </div>
        <div className="hidden md:block border-l border-gray-300 h-10"></div>
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-4xl font-bold text-blue-600">24/7</span>
          <p className="text-gray-600 mt-2">Availability</p>
        </div>
        <div className="hidden md:block border-l border-gray-300 h-10"></div>
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-4xl font-bold text-blue-600">5 min</span>
          <p className="text-gray-600 mt-2">Response time</p>
        </div>
      </div>
    </section>
  );
};

export default CustomerSupport;
