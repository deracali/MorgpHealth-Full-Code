import React from 'react';
import { FaRegCalendarAlt, FaLock, FaFileAlt, FaBell } from 'react-icons/fa';
import { assets } from '../assets/assets_frontend/assets';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaRegCalendarAlt className="text-blue-600 text-3xl" />,
      title: 'Convenient Online Booking',
      description:
        'Easily schedule consultations and meetings with healthcare professionals through our user-friendly online booking platform.',
      imageSrc: assets.rectangle, // Replace with your actual image path
      linkText: 'Learn more',
    },
    {
      icon: <FaLock className="text-blue-600 text-3xl" />,
      title: 'Secure Virtual Meetings',
      description:
        'Experience secure and convenient virtual consultations from home. Our encrypted video conferencing guarantees confidential interactions, removing the need for in-person visits.',
      imageSrc: assets.iphone13, // Replace with your actual image path
    },
    {
      icon: <FaFileAlt className="text-blue-600 text-3xl" />,
      title: 'Records Management',
      description:
        'Effortlessly store and access patient records. Ensure streamlined management by providing vital information to healthcare providers during appointments.',
    },
    {
      icon: <FaBell className="text-blue-600 text-3xl" />,
      title: 'Instant Confirmation',
      description:
        'Receive instant confirmation of your bookings, along with timely reminders to ensure you never miss a meeting.',
    },
  ];

  return (
    <section className="choose px-4 py-12 md:px-16 lg:px-24 bg-gray-50">
      <h2 className="text-3xl font-semibold text-center mb-12">
        Why choose <span className="text-blue-600">Morgphealth?</span>
      </h2>

      <div className="chooseus">
        {/* Left Column */}
        <div className="cards grid w-3/5 grid-cols-3 gap-4 sm:h-full h-[500px]">
          {/* Feature 1 (Card 1) */}
          <div className="card1 col-span-2 sm:col-span-1 bg-[#FFE9E6] flex items-center justify-center rounded-xl p-6 shadow-lg">
            <div className="text-center flex">
                <diV>
              {features[0].icon}
              <h3 className="text-xl font-bold text-[#0F0F0F] mt-4">{features[0].title}</h3>
              <p className="mt-2 w-[80%] sm:w-full text-[#0F0F0F]">{features[0].description}</p>
             </diV>
              {features[0].imageSrc && (
                <div className="mt-4">
                  <img
                    src={features[0].imageSrc}
                    alt={features[0].title}
                    className="card1-img object-cover mx-auto"
                  />
                </div>
              )}
            </div>
          </div>
  {/* Feature 2 (Card 2) */}
  <div className="bg-[#FFE9E6] flex items-center justify-center rounded-xl p-6 shadow-lg">
            <div className="text-center">
              {features[3].icon}
              <h3 className="text-xl font-bold text-[#0F0F0F] mt-4">{features[3].title}</h3>
              <p className="mt-2 w-[80%] sm:w-full text-[#0F0F0F]">{features[3].description}</p>
            </div>
          </div>

          {/* Feature 4 (Card 4) */}
          <div className="bg-[#FFE9E6] flex items-center justify-center rounded-xl p-6 shadow-lg">
            <div className="text-center">
              {features[2].icon}
              <h3 className="text-xl font-bold text-[#0F0F0F] mt-4">{features[2].title}</h3>
              <p className="mt-2 w-[80%] sm:w-full text-[#0F0F0F]">{features[2].description}</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="card4-width w-2/5 sm:w-[60%]">
         {/* Feature 3 (Card 3) */}
         <div className="bg-[#FFE9E6] h-full flex items-left justify-center rounded-xl p-6 shadow-lg">
            <div className="card4 text-center">
              <div>
              {features[1].icon}
              <h3 className="text-xl font-bold text-[#0F0F0F] mt-4">{features[1].title}</h3>
              <p className="card4-text mt-2 w-[80%] md:w-full mb-[30px] text-[#0F0F0F]">{features[1].description}</p>
              </div>
              {features[1].imageSrc && (
                <div className="mt-4">
                  <img
                    src={features[1].imageSrc}
                    alt={features[1].title}
                    className="card4-img w-[252px] h-[256px] object-cover mx-auto"
                  />
                </div>
              )}
            </div>
          </div>
        
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
