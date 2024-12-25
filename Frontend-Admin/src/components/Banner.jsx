import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'
import "../styles/insurance.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { AiFillSkin } from "react-icons/ai";
import { FaTooth } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";


export default function Banner() {

    const navigate = useNavigate()

  return (
    <>
    <div className='flex bg-indigo-200 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
            <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
            <p>Book Appointment</p>
            <p className='mt-4'>With 100+ Trusted Doctors</p>
        </div>
        <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'>Create account</button>
        </div>

        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
            <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt=''/>
        </div>
    </div>
  

   

      <div className="why-choose-us">
        <div className="why-choose-us-left">
          <h3>Why Choose Us</h3>

          <div className="why-choose-box-container">
            <div className="why-choose-box">
              <FaCheckCircle
                style={{
                  width: "35px",
                  height: "35px",
                  color: "#ffffff",
                  marginRight: "10px",
                }}
              />
              <div className="why-choose-box-text">
                <strong>Advance Care</strong>
                <p>Lorem ipsum dolor sit</p>
              </div>
            </div>
            <div className="why-choose-box">
              <FaCheckCircle
                style={{
                  width: "35px",
                  height: "35px",
                  color: "#ffffff",
                  marginRight: "10px",
                }}
              />
              <div className="why-choose-box-text">
                <strong>Advance Care</strong>
                <p>Lorem ipsum dolor sit</p>
              </div>
            </div>
            <div className="why-choose-box">
              <FaCheckCircle
                style={{
                  width: "35px",
                  height: "35px",
                  color: "#ffffff",
                  marginRight: "10px",
                }}
              />

              <div className="why-choose-box-text">
                <strong>Advance Care</strong>
                <p>Lorem ipsum dolor sit</p>
              </div>
            </div>
            <div className="why-choose-box">
              <FaCheckCircle
                style={{
                  width: "35px",
                  height: "35px",
                  color: "#ffffff",
                  marginRight: "10px",
                }}
              />

              <div className="why-choose-box-text">
                <strong>Advance Care</strong>
                <p>Lorem ipsum dolor sit</p>
              </div>
            </div>
          </div>
          <Link to="https://insurance-morgphealth.netlify.app/" className="why-choose-us-btn">
            Apply for Insurance
          </Link>
        </div>
        <div className="why-choose-us-right">
          <h3>
            Emergency?
            <br />
            Contact Us
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
            nemo!
          </p>

          <div className="w-right-contact-container">
            <div className="w-right-contact-box">
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#4060b3",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "10px",
                }}
              >
                <FaPhone
                  style={{
                    color: "#ffffff",
                    fontSize: "1.2rem",
                  }}
                />
              </div>
              <div className="w-right-contact-box-text">
                <span>Call Us Now</span>
                <strong>+123 456 789</strong>
              </div>
            </div>
            <div className="w-right-contact-box">
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#4060b3",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "10px",
                }}
              >
                <MdOutlineMessage
                  style={{
                    color: "#ffffff",
                    fontSize: "1.2rem",
                  }}
                />
              </div>
              <div className="w-right-contact-box-text">
                <span>Mail Us</span>
                <strong>info@gmail.com</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
    
  )
}
