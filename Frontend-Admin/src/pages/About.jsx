import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

export default function About() {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'> 
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt=''/>
     
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
      <p>Welcome to MorgepHealth, your trusted partner in managing your health</p>
      <p>At MorgepHealth, we believe that taking control of your health should be simple and accessible. Our platform offers you a range of tools and resources designed to empower you on your wellness journey.</p>
      <b className='text-gray-800'>Our Vision</b>
      <p>At MorgepHealth, our vision is to create a world where everyone has the knowledge, resources, and support needed to take charge of their health and well-being. We strive to empower individuals to make informed health decisions, foster strong patient-provider relationships, and build a thriving community dedicated to holistic wellness.</p>
      </div>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
      <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text[-15px] hover:bg-primary hover-text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>Efficiency:</b>
        <p>Tailored recommendations based on your unique health profile.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text[-15px] hover:bg-primary hover-text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>Convenience:</b>
        <p>TailoreOur team of healthcare professionals is here to support you every step of the way.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text[-15px] hover:bg-primary hover-text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>User Friendly</b>
        <p> We prioritize your ease of use, making health management straightforward and efficient.</p>
        </div>
     
      </div>
    </div>
  )
}
