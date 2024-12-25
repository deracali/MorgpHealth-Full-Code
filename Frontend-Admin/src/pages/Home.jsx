import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import FeaturesSection from '../components/Features'
import CustomerSupport from '../components/customersupport'
import InsuranceBanner from '../components/InsuranceBanner'


export default function Home() {
  return (
    <div>
      <Header/>
      <FeaturesSection/>
      <CustomerSupport/>
      <InsuranceBanner/>
      <SpecialityMenu/>
      <TopDoctors/>

    </div>
  )
}
