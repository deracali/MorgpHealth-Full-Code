import React, { useContext, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';

export default function Login() {
  const [state, setState] = useState('Admin'); // Keeping original state
  const { setAToken, backendUrl,doctorId,setDoctorId } = useContext(AdminContext);
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { setDToken } = useContext(DoctorContext);


  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const endpoint = state === 'Admin' ? 'login' : 'login'; // Dynamic endpoint based on state

      if(state === 'Admin'){
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
        if (data.success) {
          localStorage.setItem('aToken', data.token);
          localStorage.setItem('doctorId', data.id);
          setAToken(data.token);
          setDoctorId(data.id);
          toast.success(`${state} Successful`); // Feedback based on state
          navigate('/dashboard')
        } else {
          toast.error(data.message);
        }
      }  else{
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, { email, password });
        if (data.success) {
          localStorage.setItem('dToken', data.token);
          localStorage.setItem('doctorId', data.id);
          setDToken(data.token);
          setDoctorId(data.id);
          toast.success(`${state} Successful`);  
          navigate(`/doctor-dashboard/${doctorId}`)
        } else {
          toast.error(data.message);
        }
      }

    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };


  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Admin' ? "Admin" : "Doctor"}</p>
        <div className='w-full'>
          <p>Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            type='email'
            required
          />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            type='password'
            required
          />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>
          {state === 'Sign Up' ? "Create Account" : "Login"}
        </button>
        {
          state === "Sign Up" 
            ? <p>Admin? <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer'>Click here</span></p>
            : <p>Doctor? <span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss />
    </form>
  );
}
