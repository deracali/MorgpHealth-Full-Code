import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { assets } from '../assets/assets_frontend/assets';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-blue-200 py-10 px-5 md:px-10 lg:px-20">
      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-10 my-10 text-sm">
        
        {/* Column 1: Logo & Description */}
        <div className="flex-1">
          <img className="mb-5 w-40" src={assets.MorgpLogo} alt="MorgpHealth Logo" />
          <p className="text-gray-700 leading-6 mb-6">
            As a bonus, be the first to know about our insurance offerings that provide comprehensive coverage for your well-being.
          </p>
          {/* Social Media Icons */}
          <div className="flex space-x-4 text-xl">
            <a href="#" aria-label="Facebook" className="hover:text-gray-900">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-gray-900">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-gray-900">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Column 2: Useful Links */}
        <div className="flex-1">
          <h4 className="text-xl font-medium mb-5">Useful Links</h4>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link to="/" className="hover:text-gray-900">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-900">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-900">Contact Us</Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-gray-900">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Information */}
      

<div className="flex-1">
  <h4 className="text-xl font-medium mb-5">Get in Touch</h4>
  <ul className="space-y-2 text-gray-700">
    <li className="flex items-center space-x-2">
      <FiPhone />
      <a href="tel:+12124567890" className="hover:text-gray-900">+1-212-456-7890</a>
    </li>
    <li className="flex items-center space-x-2">
      <FiMail />
      <a href="mailto:morgphealth@gmail.com" className="hover:text-gray-900">morgphealth@gmail.com</a>
    </li>
    <li className="flex items-start space-x-2">
      <FiMapPin />
      <address className="not-italic">
        49 Harristown Road, Castlermerry, Co. Dublin, E18 F075, Ireland
      </address>
    </li>
  </ul>
</div>


        {/* Column 4: App Downloads */}
        <div className="flex-1">
          <h4 className="text-xl font-medium mb-5">Download App</h4>
          <div className="flex justify-center items-center space-x-4">
  {/* App Store Button */}
  <a href="#" className="block w-40">
    <img src={assets.appstore} alt="Download on the App Store" />
  </a>
  {/* Google Play Button */}
  <a href="#" className="block w-40">
    <img src={assets.googleplay} alt="Get it on Google Play" />
  </a>
</div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-300 mt-10 pt-5">
        <p className="text-center text-gray-600 text-sm">
          © Copyright 2024 MorgpHealth - All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
