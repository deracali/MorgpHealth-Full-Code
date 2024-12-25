import React from 'react';
import html2pdf from 'html2pdf.js';
import '../styles/doctorsDia.css';

export default function DoctorsDiagnosis() {

  // Function to trigger PDF download
  const handleDownload = () => {
    const element = document.getElementById('diagnosis'); // Select the content to convert
    html2pdf()
      .from(element)
      .save('Doctors_Diagnosis.pdf'); // Filename of the downloaded PDF
  };

  return (
    <div>
      <div id="diagnosis" className="reportContent"> {/* Wrapping the content to download */}
        <div style={{marginBottom:"100px"}} className="reportHeader">
          <img 
            src="https://labsmart-healthcare-trial.s3.us-west-2.amazonaws.com/diagnostic_lab_524/sample_report_header.jpg" 
            alt="lab-name-header" 
          />
        </div>

        <div className="patientDetails">
          <hr />
          <table border="0">
            <tbody>
              <tr>
                <td>Patient Name:</td>
                <td className="alignLeft">Referred By:</td>
              </tr>
              <tr>
                <td>Age/Sex:</td>
                <td className="alignLeft">Date:</td>
              </tr>
              <tr>
                <td>Daily Case Number:</td>
                <td className="alignLeft">Patient ID/UHID:</td>
              </tr>
            </tbody>
          </table>
          <hr />
        </div>

        <div className="reportBody">
          Report
        </div>

        <div className="reportSign">
          <div className="labInchargeSign">
            <img 
              src="https://labsmart-healthcare-trial.s3.us-west-2.amazonaws.com/diagnostic_lab_524/sample_lab_incharge_sign.jpg" 
              alt="lab-incharge-sign" 
            />
            <figcaption>Mr. Sachin Sharma</figcaption>
          </div>
          <div className="labDoctorSign">
            <img 
              src="https://labsmart-healthcare-trial.s3.us-west-2.amazonaws.com/diagnostic_lab_524/sample_pathologist_sign.jpg" 
              alt="lab-doctor-sign" 
            />
            <figcaption>Dr. A.K. Asthana</figcaption>
          </div>
        </div>

        <div className="reportFooter">
          <img 
            src="https://labsmart-healthcare-trial.s3.us-west-2.amazonaws.com/diagnostic_lab_524/sample_report_footer.jpg" 
            alt="lab-footer" 
          />
        </div>
      </div>
      
      {/* Download button */}
      <div className="flex justify-center mt-4">
        <button 
          onClick={handleDownload} 
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Download Diagnosis
        </button>
      </div>
    </div>
  );
}
