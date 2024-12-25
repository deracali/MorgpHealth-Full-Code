import React from 'react';
import html2pdf from 'html2pdf.js';
import '../styles/doctorsPres.css';

export default function DoctorsPrescription() {
  
  // Function to trigger PDF download
  const handleDownload = () => {
    const element = document.getElementById('prescription'); // Select the content to convert
    html2pdf()
      .from(element)
      .save('Doctors_Prescription.pdf'); // Filename of the downloaded PDF
  };

  return (
    <div>
      <div id="prescription" className="prescriptionContainer"> {/* Wrapping the content to download */}
        <header className="headerRow">
          <div className="docInfoCol">
            <div className="doctorDetails">
              <p className="doctorName">Dr. Alvin plus father name</p>
              <p className="doctorMeta">MS - General Surgery, F.I.A.G.E.S, F.UROGYN(USA), FECSM (Oxford, UK), MBBS</p>
              <p className="doctorMeta">Rgn: 2341</p>
            </div>
            <div className="clinicDetails">
              <p className="clinicMeta">Clinic Name</p>
              <p className="clinicMeta">#1, Crescent Park Street, Chennai</p>
            </div>
          </div>
          <div className="datetimeCol">
            <p>Date: 18/03/16</p>
            <p>Time: 03:13</p>
          </div>
        </header>

        <div className="prescriptionDetails">
          <p style={{ marginLeft: '15px', fontSize: '10px', fontWeight: 'bold' }}>Rx Name of patient, M/35</p>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Type</th>
                <th>Name of the drug</th>
                <th>Dosage</th>
                <th>Frequency</th>
                <th>Period</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.</td>
                <td>Tablet</td>
                <td>Brufen Brufen Brufen</td>
                <td>400 mg</td>
                <td>1 - 0 - 1</td>
                <td>10 days</td>
              </tr>
              <tr>
                <td>2.</td>
                <td>Lotion</td>
                <td>Brufen</td>
                <td>400 mg</td>
                <td>1 - 0 - 1</td>
                <td>10 days</td>
              </tr>
              <tr>
                <td>3.</td>
                <td>Syrup</td>
                <td>Brufen</td>
                <td>400 mg</td>
                <td>1 - 0 - 1</td>
                <td>10 days</td>
              </tr>
              <tr>
                <td colSpan="5">
                  <p style={{ marginLeft: '14px', fontSize: '6px' }}>Before food (Don’t take the tab, I say)</p>
                </td>
              </tr>
              <tr>
                <td>4.</td>
                <td>Oil</td>
                <td>Brufen</td>
                <td>400 mg</td>
                <td>1 - 0 - 1</td>
                <td>10 days</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="reportBody">
          Report
        </div>
        <p style={{ fontSize: '9px', textAlign: 'right', paddingBottom: '15px', paddingRight: '25px' }}>Dr. Alvin plus father name</p>
        <p style={{ fontSize: '6px', textAlign: 'center', paddingBottom: '20px' }}>This is a digitally generated Prescription</p>
      </div>
      
      {/* Download button */}
      <div className="flex justify-center mt-4">
        <button 
          onClick={handleDownload} 
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Download Prescription
        </button>
      </div>
    </div>
  );
}
