import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Session = () => {
  const { appointmentId } = useParams(); // Get appointmentId from the URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Your backend URL
console.log(appointmentId)
  // State variables for each input field
  const [testResult, setTestResult] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [drugName1, setDrugName1] = useState('');
  const [dosage1, setDosage1] = useState('');
  const [frequency1, setFrequency1] = useState('');
  const [period1, setPeriod1] = useState('');
  const [drugName2, setDrugName2] = useState('');
  const [dosage2, setDosage2] = useState('');
  const [frequency2, setFrequency2] = useState('');
  const [period2, setPeriod2] = useState('');
  const [drugName3, setDrugName3] = useState('');
  const [dosage3, setDosage3] = useState('');
  const [frequency3, setFrequency3] = useState('');
  const [period3, setPeriod3] = useState('');
  const [drugName4, setDrugName4] = useState('');
  const [dosage4, setDosage4] = useState('');
  const [frequency4, setFrequency4] = useState('');
  const [period4, setPeriod4] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const updateData = {
      testResult,
      hospitalName,
      age,
      sex,
      drugName1,
      dosage1,
      frequency1,
      period1,
      drugName2,
      dosage2,
      frequency2,
      period2,
      drugName3,
      dosage3,
      frequency3,
      period3,
      drugName4,
      dosage4,
      frequency4,
      period4,
    };

    try {
      const response = await axios.put(`${backendUrl}/api/doctor/update-appointment/${appointmentId}`, updateData);
      if (response.data.success) {
        // Handle success (e.g., show a success message or redirect)
        alert('Appointment updated successfully!');
      } else {
        alert('Failed to update appointment: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('An error occurred while updating the appointment.');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Update Test Results</p>
      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        
        <div className='flex flex-col gap-4 text-gray-600'>
          <InputField label="Test Result" value={testResult} onChange={setTestResult} />
          <InputField label="Hospital Name" value={hospitalName} onChange={setHospitalName} />
          <InputField label="Age" value={age} onChange={setAge} />
          <InputField label="Sex" value={sex} onChange={setSex} />

          {/* Drug 1 */}
          <InputField label="Drug Name 1" value={drugName1} onChange={setDrugName1} />
          <InputField label="Dosage 1" value={dosage1} onChange={setDosage1} />
          <InputField label="Frequency 1" value={frequency1} onChange={setFrequency1} />
          <InputField label="Period 1" value={period1} onChange={setPeriod1} />

          {/* Drug 2 */}
          <InputField label="Drug Name 2" value={drugName2} onChange={setDrugName2} />
          <InputField label="Dosage 2" value={dosage2} onChange={setDosage2} />
          <InputField label="Frequency 2" value={frequency2} onChange={setFrequency2} />
          <InputField label="Period 2" value={period2} onChange={setPeriod2} />

          {/* Drug 3 */}
          <InputField label="Drug Name 3" value={drugName3} onChange={setDrugName3} />
          <InputField label="Dosage 3" value={dosage3} onChange={setDosage3} />
          <InputField label="Frequency 3" value={frequency3} onChange={setFrequency3} />
          <InputField label="Period 3" value={period3} onChange={setPeriod3} />

          {/* Drug 4 */}
          <InputField label="Drug Name 4" value={drugName4} onChange={setDrugName4} />
          <InputField label="Dosage 4" value={dosage4} onChange={setDosage4} />
          <InputField label="Frequency 4" value={frequency4} onChange={setFrequency4} />
          <InputField label="Period 4" value={period4} onChange={setPeriod4} />
        </div>

        <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Update Test Results</button>
      </div>
    </form>
  );
};

// InputField Component
const InputField = ({ label, value, onChange }) => (
  <div>
    <label className='block text-sm font-medium text-gray-700'>{label}</label>
    <input
      type='text'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-primary focus:border-primary'
    />
  </div>
);

export default Session;
