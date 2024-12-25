import React from "react";
import "../styles/insurance.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
import DocImg from "../images/main-bg.png";
import StoryImg from "../images/our-story.jpg";
import { FaCapsules } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { AiFillSkin } from "react-icons/ai";
import { FaSquarePollHorizontal } from "react-icons/fa6";
import { FaTooth } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";


export default function Insurance() {
  return (
    <>
      <div className="hero-content">
        <div className="hero-text">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug">
  Find the Perfect Health Insurance for You
</h1>
<p className="text-gray-600 text-sm sm:text-base mt-4">
  Discover health insurance plans tailored to your needs. Whether it's coverage for your family or individual plans, we make finding affordable and comprehensive options simple and stress-free.
</p>
<p className="text-gray-600 text-sm sm:text-base mt-2">
  Compare policies, understand your benefits, and get insured with confidence—all in one place. Your health, your choice, your peace of mind.
</p>

          <div className="hero-text-btns">
            <Link className="a" to="https://insurance-morgphealth.netlify.app">
              Get Insuranced
            </Link>
          </div>
        </div>

        <div className="hero-img">
          <img src={DocImg} alt="" />
        </div>
      </div>
      <div className="what-we-provide">
        <div className="w-info-box w-info-box-1">
          <div className="w-info-icon">
            <FaCapsules />
          </div>

          <div className="w-info-text">
            <strong>Specialised Service</strong>
            <p>Access tailored healthcare services designed to meet your unique needs. From routine checkups to advanced treatments, we've got you covered.</p>
          </div>
        </div>

        <div className="w-info-box w-info-box-2">
          <div className="w-info-icon">
            <AiFillMessage />
          </div>

          <div className="w-info-text">
            <strong>24/7 Advanced Care</strong>
            <p>Our dedicated team is here for you around the clock, offering expert care and support whenever you need it.</p>
          </div>
        </div>

        <div className="w-info-box w-info-box-3">
          <div className="w-info-icon">
            <FaSquarePollHorizontal />
          </div>

          <div className="w-info-text">
            <strong>Get Result Online</strong>
            <p>Conveniently access your medical results and reports online, ensuring a seamless and efficient healthcare experience.</p>
          </div>
        </div>
      </div>

      <div className="our-story">
        <div className="our-story-img">
          <img src={StoryImg} alt="" />
        </div>

        <div className="our-story-text">
        <h2 className="text-2xl font-bold mb-4">Short Story About Our Clinic</h2>
<p className="text-gray-600 mb-4">
  MorgpHealth began with a simple mission: to make quality healthcare accessible to everyone. Founded in 2010 by a group of dedicated medical professionals, our clinic was established to bridge the gap between patients and the care they deserve. 
</p>
<p className="text-gray-600 mb-4">
  Over the years, MorgpHealth has grown into a trusted name in the community. With state-of-the-art facilities and a passionate team of doctors and specialists, we are proud to offer comprehensive services, from preventive care to advanced treatments. Our commitment to innovation led us to integrate technology, enabling patients to book appointments, access prescriptions, and receive their test results online—making healthcare more convenient than ever.
</p>
<p className="text-gray-600">
  At MorgpHealth, we believe in treating every patient like family. Your health is our priority, and we are here to support you every step of the way.
</p>

          <div className="story-number-container">
            <div className="story-number-box s-n-box1">
              <storng>1000+</storng>
              <span>Happy Patients</span>
            </div>

            <div className="story-number-box s-n-box2">
              <storng>215+</storng>
              <span>Expert Doctor's0</span>
            </div>

            <div className="story-number-box s-n-box3">
              <storng>300+</storng>
              <span>Hospital Rooms</span>
            </div>

            <div className="story-number-box s-n-box4">
              <storng>106+</storng>
              <span>Award Winning</span>
            </div>
          </div>
        </div>
      </div>

      <div className="our-services">
        <div className="services-heading">
          <div className="services-heading-text">
            <strong>Our Services</strong>
            <h2>High Quality Services For You</h2>
          </div>
        </div>

        <div className="services-box-container">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => }
          >
            <SwiperSlide>
              <div className="services-box s-box1">
                <div className="i">
                  <FaTooth />
                </div>

                <strong className="text-lg font-bold text-blue-600">Dental Care</strong>

<p className="text-gray-600 mt-2">
  Keep your smile healthy and bright with our comprehensive dental care services. From routine cleanings to advanced treatments, our experienced team ensures you receive the best care in a comfortable and welcoming environment. Your oral health is our priority!
</p>


               
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="services-box s-box2">
                <div className="i">
                  <FaEye />
                </div>

                <strong className="text-lg font-bold text-blue-600">Eye Care</strong>

<p className="text-gray-600 mt-2">
  Protect and preserve your vision with our expert eye care services. Whether you need a routine eye exam, treatment for an eye condition, or assistance with corrective lenses, our specialists are here to provide personalized care for your unique needs. See the world clearly with us!
</p>

              
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="services-box s-box3">
                <div className="i">
                  <AiFillSkin />
                </div>

                <strong className="text-lg font-bold text-blue-600">Skin Care</strong>

<p className="text-gray-600 mt-2">
  Achieve healthy, glowing skin with our comprehensive skin care services. Whether it's acne treatment, anti-aging solutions, or personalized skincare routines, our experts are here to help you feel confident in your skin. Experience the best in skin care with treatments tailored just for you.
</p>

               
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="services-box s-box4">
                <div className="i">
                  <FaTooth />
                </div>

                <strong className="text-lg font-bold text-blue-600">Health & Wellness</strong>

<p className="text-gray-600 mt-2">
  Prioritize your overall well-being with our holistic health and wellness services. From preventive care to personalized fitness plans, we provide a range of treatments designed to improve your quality of life. Stay active, stay healthy, and live your best life with our expert guidance.
</p>


               
              </div>
            </SwiperSlide>
            ...
          </Swiper>
        </div>

        <span className="services-help-btn">
          Contact Us If You Need Any Help And Service{" "}
          <Link className="a" to="">
            Let's Get Started
          </Link>
        </span>
      </div>

      <div className="why-choose-us" style={{marginBottom:'40px'}}>
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
              <strong className="text-lg font-bold text-blue-600">Advanced Care</strong>
  <p className="text-gray-600 mt-2">
    Experience the highest standard of care with our advanced medical technologies and expert team. We are dedicated to providing innovative treatments that cater to your individual needs, ensuring the best outcomes for your health.
  </p>
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
              <strong className="text-lg font-bold text-blue-600">Comprehensive Healthcare</strong>
<p className="text-gray-600 mt-2">
  Our clinic offers a full range of healthcare services, ensuring that all aspects of your well-being are taken care of. From routine check-ups to specialized treatments, we provide comprehensive care that meets your unique needs.
</p>

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
              <strong className="text-lg font-bold text-blue-600">Expert Consultation</strong>
<p className="text-gray-600 mt-2">
  Our team of experienced doctors and specialists are here to provide expert consultations for your specific health needs. Whether you're seeking advice on preventive care or complex conditions, we offer trusted insights and personalized guidance.
</p>

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
              <strong className="text-lg font-bold text-blue-600">Personalized Care</strong>
<p className="text-gray-600 mt-2">
  At our clinic, we believe in treating each patient as an individual. Our personalized care approach means we take the time to understand your unique health needs and craft a tailored treatment plan that works best for you.
</p>

              </div>
            </div>
          </div>
          <Link to="https://insurance-morgphealth.netlify.app/" className="why-choose-us-btn">
            Apply for Insurance
          </Link>
        </div>
        <div className="why-choose-us-right">
        <h3 className="text-2xl font-bold text-red-600">
  Emergency?
  <br />
  Contact Us Immediately
</h3>
<p className="text-gray-600 mt-2">
  If you're facing a medical emergency, don't wait. Our team is ready to provide immediate assistance and care to address your urgent needs. Call us now for prompt, professional attention.
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
  );
}
