
import {Routes,Route} from "react-router-dom"
import './App.css'
import Home from './pages/Home'
import MyAppointment from './pages/Admin/MyAppointment'
import MyProfile from './pages/Admin/MyProfile'
import Contact from './pages/Contact'
import About from './pages/About'
import Login from './pages/Login'
import Doctor from './pages/Doctor'
import Navbar from './components/Navbar'
import Footer from "./components/Footer"
import Appointment from "./pages/Appointment"
import Insurance from "./pages/Insurance"
import InsuranceData from "./pages/InsuranceData"
import DoctorsPrescription from "./pages/DoctorsPrescription"
import DoctorsDiagnosis from "./pages/DoctorsDiagnosis"
import User from "./pages/Admin/User"
import AddDoctor from "./pages/RegisterDoctor"
import Session from "./pages/Admin/Session"
import VideoCall from "./pages/Admin/VideoCall"
import Stripe from "./pages/Stripe"
import FlutterWave from "./pages/Flutterwave"
import InsuranceFlutterWave from "./pages/InsuranceFlutter"
import InsuranceStripe from "./pages/InsuranceStripe"
import PaymentFailed from "./pages/PaymentFailed"
import PaymentSuccess from "./pages/Paymentsuccess"
import LabStripe from "./pages/LabStripe"
import LabFlutterWave from "./pages/LabFlutterwave"
import DocRegisterMsg from "./pages/docRegisterMsg"


function App() {


  return (
    <div className='mx-2 sm:mx-[5%]'>
      <Navbar/>
        <Routes>
         <Route path="/" exact element={<Home/> } />    
         <Route path="/doctors" element={<Doctor/> } />    
         <Route path="/add-doc" element={<AddDoctor/> } />    
         <Route path="/doctors/:speciality" element={<Doctor/> } />    
         <Route path="/login" element={<Login/> } />    
         <Route path="/about" element={<About/> } />    
         <Route path="/contact" element={<Contact/>} />    
         <Route path="/my-profile"  element={<MyProfile/> } />    
         <Route path="/appointment/:docId" element={<Appointment/> } />    
         <Route path="/my-appointments/:id" element={<MyAppointment/> } />    
         <Route path="/session/:id/:sessionId" element={<Session/> } />    
         <Route path="/my-insurance" element={<InsuranceData/> } />    
         <Route path="/doctors-prescription/:sessionId" element={<DoctorsPrescription/> } />    
         <Route path="/doctors-diagnosis/:sessionId" element={<DoctorsDiagnosis/> } />    
         <Route path="/insurance" element={<Insurance/> } />    
         <Route path="/video-call/:appointmentId" element={<VideoCall />} />




         <Route path="/user-panel" element={<User/> } />    
         <Route path="/registration-success" element={<DocRegisterMsg/> } />    
         <Route path="/paymentsuccess" element={<PaymentSuccess/> } />    
         <Route path="/paymentfailed" element={<PaymentFailed/> } />    
         <Route path="/stripe/:docName/:userName/:userEmail/:docFees" element={<Stripe />} />
         <Route path="/flutterwave/:docName/:userName/:userEmail/:docFees" element={<FlutterWave />} />
         <Route path="/insuranceflutterwave/:name/:email/:price" element={<InsuranceFlutterWave />} />
         <Route path="/insurancestripe/:name/:email/:price" element={<InsuranceStripe />} />
         <Route path="/labstripe/:docName/:userName/:userEmail/:docEmail/:appointmentId/:fee" element={<LabStripe />} />
         <Route path="/labflutterwave/:docName/:userName/:userEmail/:docEmail/:appointmentId/:fee" element={<LabFlutterWave />} />
        </Routes>
      <Footer/>
        </div> 
  )
}

export default App
