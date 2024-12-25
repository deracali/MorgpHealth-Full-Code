import React, { useState } from 'react';
import { assets } from '../../assets/assets_admin/assets';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function AddDoctor() {
  const [docImg, setDocImg] = useState(null);
  const [medicalLicense, setMedicalLicense] = useState(null);
  const [diplomaCertificates, setDiplomaCertificates] = useState(null);
  const [proofOfID, setProofOfID] = useState(null);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [universityCountry, setUniversityCountry] = useState('');
  const [medicalCouncilName, setMedicalCouncilName] = useState('');
  const [medicalCouncilCountry, setMedicalCouncilCountry] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [region, setRegion] = useState('');

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const utoken = localStorage.getItem('utoken');

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!docImg || !medicalLicense || !diplomaCertificates || !proofOfID) {
      return toast.error('All images must be selected');
    }

    const formData = new FormData();
    formData.append('image', docImg);
    formData.append('medicalLicense', medicalLicense);
    formData.append('diplomaCertificates', diplomaCertificates);
    formData.append('proofOfID', proofOfID);

    // Append other form fields
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('gender', gender);
    formData.append('experience', experience);
    formData.append('fees', Number(fees));
    formData.append('about', about);
    formData.append('speciality', speciality);
    formData.append('degree', degree);
    formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('universityName', universityName);
    formData.append('universityCountry', universityCountry);
    formData.append('medicalCouncilName', medicalCouncilName);
    formData.append('medicalCouncilCountry', medicalCouncilCountry);
    formData.append('graduationYear', graduationYear);
    formData.append('region', region); // Add region to form data

    try {
      const { data } = await axios.post(`${backendUrl}}/api/admin/add-doctor`, formData, {
        headers: { 
          'Authorization': `Bearer ${utoken}`
        }
      });

      if (data.success) {
        toast.success(data.message);
        // Reset form fields
        resetFormFields();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error details:", error.response || error.message || error);
      toast.error(error.message || 'An error occurred');
    }
  };

  const resetFormFields = () => {
    setDocImg(null);
    setMedicalLicense(null);
    setDiplomaCertificates(null);
    setProofOfID(null);
    setName('');
    setEmail('');
    setPassword('');
    setGender('');
    setSpeciality('');
    setAddress1('');
    setAddress2('');
    setDegree('');
    setAbout('');
    setFees('');
    setDateOfBirth('');
    setUniversityName('');
    setUniversityCountry('');
    setMedicalCouncilName('');
    setMedicalCouncilCountry('');
    setGraduationYear('');
    setRegion(''); // Reset region
  };

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>
      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <FileUploadField 
          label="Upload Doctor Picture" 
          file={docImg} 
          setFile={setDocImg} 
          asset={assets.upload_area} 
        />

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <InputField label="Doctor Name" value={name} onChange={setName} required />
            <InputField label="Doctor Email" value={email} onChange={setEmail} type="email" required />
            <InputField label="Doctor Password" value={password} onChange={setPassword} type="password" required />
            <SelectField 
              label="Gender" 
              value={gender} 
              onChange={setGender} 
              options={['Male', 'Female', 'Other']} 
              required 
            />
            <SelectField 
              label="Experience" 
              value={experience} 
              onChange={setExperience} 
              options={experienceOptions} 
            />
            <InputField label="Fees" value={fees} onChange={setFees} required />
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
          <InputField label="Speciality" value={degree} onChange={setSpeciality} required />
            <InputField label="Education" value={degree} onChange={setDegree} required />
            <InputField label="Address 1" value={address1} onChange={setAddress1} required />
            <InputField label="Address 2" value={address2} onChange={setAddress2} />
            <InputField label="Region" value={region} onChange={setRegion} required /> {/* Region Field */}
          </div>
        </div>

        <div className='flex-1 flex flex-col gap-1'>
          <p>About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className='w-full px-4 pt-2 border rounded'
            placeholder='Write about doctor'
            rows={5}
            required
          />
        </div>

        <FileUploadField 
          label="Upload Medical License" 
          file={medicalLicense} 
          setFile={setMedicalLicense} 
          asset={assets.upload_area} 
        />
        <FileUploadField 
          label="Upload Diploma Certificates" 
          file={diplomaCertificates} 
          setFile={setDiplomaCertificates} 
          asset={assets.upload_area} 
        />
        <FileUploadField 
          label="Upload Proof of ID" 
          file={proofOfID} 
          setFile={setProofOfID} 
          asset={assets.upload_area} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-600">
          <InputField label="Date of Birth" value={dateOfBirth} onChange={setDateOfBirth} type="date" required />
          <InputField label="University Name" value={universityName} onChange={setUniversityName} required />
          <InputField label="University Country" value={universityCountry} onChange={setUniversityCountry} required />
          <InputField label="Medical Council Name" value={medicalCouncilName} onChange={setMedicalCouncilName} required />
          <InputField label="Medical Council Country" value={medicalCouncilCountry} onChange={setMedicalCouncilCountry} required />
          <InputField label="Graduation Year" value={graduationYear} onChange={setGraduationYear} type="number" required />
        </div>

        <button type='submit' className='w-full mt-4 p-2 bg-green-600 text-white rounded'>Add Doctor</button>
      </div>
    </form>
  );
}

// Helper component for input fields
const InputField = ({ label, value, onChange, type = 'text', required = false }) => (
  <div className='flex flex-col gap-1'>
    <label>{label}{required && '*'}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='border rounded px-3 py-2'
      required={required}
    />
  </div>
);

// Helper component for select fields
const SelectField = ({ label, value, onChange, options, required = false }) => (
  <div className='flex flex-col gap-1'>
    <label>{label}{required && '*'}</label>
    <select 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='border rounded px-3 py-2'
      required={required}
    >
      <option value="">Select</option>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

// Helper component for checkbox groups
const CheckboxGroup = ({ label, options, selectedOptions, onChange }) => {
  const handleChange = (option) => {
    if (selectedOptions.includes(option)) {
      onChange(selectedOptions.filter(o => o !== option));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  return (
    <div className='flex flex-col gap-1'>
      <label>{label}</label>
      <div className='flex flex-col gap-2'>
        {options.map((option, index) => (
          <label key={index} className='flex items-center'>
            <input 
              type='checkbox' 
              checked={selectedOptions.includes(option)}
              onChange={() => handleChange(option)} 
              className='mr-2'
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};


// Helper component for file uploads
const FileUploadField = ({ label, file, setFile, asset }) => (
  <div className='flex flex-col gap-1'>
    <label>{label}</label>
    <input 
      type='file' 
      onChange={(e) => setFile(e.target.files[0])} 
      className='border rounded'
    />
    {/* Adjusted the className to reduce the image size */}
    <img src={asset} alt="Upload Placeholder" className='mt-2 w-20 h-20 object-cover' />
  </div>
);









// Experience options (customize as necessary)
const experienceOptions = ['1 Year', '2 Years', '3 Years', '4 Years', '5 Years', '6 Years', '7 Years', '8 Years', '9 Years', '10 Years'];

// Speciality options (customize as necessary)

const specialityOptions = ['General physician', 'Dentist', 'Cardiologist', 'Dermatologist', 'Pediatrician'];