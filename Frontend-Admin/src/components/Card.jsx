import React from 'react';
import { useNavigate } from 'react-router-dom';

// Card Component
const Card = ({ title, description, sessionId, type }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (type === 'diagnosis') {
      navigate(`/doctors-diagnosis/${sessionId}`);
    } else if (type === 'prescription') {
      navigate(`/doctors-prescription/${sessionId}`);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-5">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <button 
          onClick={handleNavigation} 
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Preview {type === 'diagnosis' ? 'Diagnosis' : 'Prescription'}
        </button>
      </div>
    </div>
  );
};

// CardContainer Component
const CardContainer = ({ sessionId }) => {
  return (
    <div className="flex flex-wrap justify-center mt-5">
      {/* Diagnosis Card */}
      <Card 
        title="Diagnosis" 
        description="Here is the diagnosis from your recent medical appointment. Please review it carefully." 
        sessionId={sessionId}  // Pass sessionId to the card
        type="diagnosis" 
      />

      {/* Prescription Card */}
      <Card 
        title="Prescription" 
        description="Here is the prescription from your recent medical appointment. Please review it carefully." 
        sessionId={sessionId}  // Pass sessionId to the card
        type="prescription" 
      />
    </div>
  );
};

export default CardContainer;
