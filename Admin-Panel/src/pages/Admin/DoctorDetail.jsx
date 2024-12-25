import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";

export default function DoctorDetail() {
  const { currency } = useContext(AppContext);
  const [profileData, setProfileData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/addDoc/review-docs/${id}`
      );

      if (data.success) {
        const profileData = data.reviewDoc || {};
        setProfileData(profileData);

        // Parse the address if it's a JSON string
        if (profileData.address) {
          profileData.address = JSON.parse(profileData.address);
        }
      } else {
        toast.error(data.message || "Failed to fetch profile data");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred while fetching profile."
      );
    }
  };

  const handleImageClick = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const handleDownloadPDF = (imageURL) => {
    const pdf = new jsPDF();
    pdf.addImage(imageURL, "JPEG", 10, 10, 180, 160);
    pdf.save("document.pdf");
  };

  const handleAddDoctor = async () => {
    try {
      const newDoctorData = {
        name: profileData.name || "New Doctor", // Placeholder data
        email: profileData.email || "", // Required
        password: profileData.password || "", // Required
        degree: profileData.degree || "Doctorate",
        speciality: profileData.speciality || ["General Practice"],
        experience: profileData.experience || "5 years",
        fees: profileData.fees || 100,
        address: profileData.address || {},
        about: profileData.about || "",
        region: profileData.region || "Downtown",
        age: profileData.age || "",
        graduationYear: profileData.graduationYear || 2018,
        universityName: profileData.universityName || "University of Medicine",
        universityCountry: profileData.universityCountry || "Country Name",
        medicalCouncilName: profileData.medicalCouncilName || "Medical Council",
        medicalCouncilCountry: profileData.medicalCouncilCountry || "Country Name",
        medicalLicense: profileData.medicalLicense || 'https://example.com/placeholder-image.jpg', // Default placeholder
        image: profileData.image || 'https://example.com/placeholder-image.jpg', // Default placeholder
        diplomaCertificates: profileData.diplomaCertificates || 'https://example.com/placeholder-image.jpg', // Default placeholder
        proofOfID: profileData.proofOfID || 'https://example.com/placeholder-image.jpg', // Default placeholder
      };

      // Add the doctor
      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, newDoctorData);
      
      if (data.success) {
        toast.success("Doctor added successfully!");
        // Delete the doctor review after successful addition
        await deleteDoctorReview();
      } else {
        toast.error(data.message || "Failed to add doctor");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred while adding the doctor."
      );
    }
  };

  const deleteDoctorReview = async () => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/addDoc/review-doctor/${id}`);

      if (data.success) {
        toast.success("Doctor review deleted successfully!");
        // Optionally, navigate to another page or refresh the view
      } else {
        toast.error(data.message || "Failed to delete doctor review");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred while deleting the review."
      );
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4 m-5">
        <div>
          {profileData?.image && (
            <img
              className="bg-primary/80 w-full sm:max-w-64 rounded-lg cursor-pointer"
              src={profileData.image}
              alt="Profile"
              onClick={() => handleImageClick(profileData.image)}
            />
          )}
        </div>
        <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            {profileData?.name || "No name available"}
          </p>
          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <p>
              {profileData?.degree || "Degree not available"} -{" "}
              {profileData?.speciality?.join(", ") || "Speciality not available"}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {profileData?.experience || "Experience not available"}
            </button>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
              About
            </p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">
              {profileData?.about || "About not available"}
            </p>
          </div>
          <p className="flex gap-2 py-2">
            Appointment fee:
            <span>
              {currency} {profileData?.fees || "N/A"}
            </span>
          </p>

          <div>
            <p>Address:</p>
            <p className="text-sm">
              {profileData.address ? (
                <>
                  {profileData.address.line1 || "Address line 1 not available"}
                  <br />
                  {profileData.address.line2 || "Address line 2 not available"}
                </>
              ) : (
                "Address not available"
              )}
            </p>
          </div>

          <p>Region: {profileData?.region || "Region not available"}</p>
          <p>Age: {profileData?.age || "age not available"}</p>
          <p>
            Graduation Year:{" "}
            {profileData?.graduationYear || "Graduation Year not available"}
          </p>
          <p>
            University:{" "}
            {profileData?.universityName || "University not available"} (
            {profileData?.universityCountry || "Country not available"})
          </p>
          <p>
            Medical Council:{" "}
            {profileData?.medicalCouncilName || "Medical Council not available"}{" "}
            ({profileData?.medicalCouncilCountry || "Country not available"})
          </p>

          <div className="mt-4">
            <h3 className="font-medium">Documents</h3>
            <div className="flex gap-4 flex-wrap">
              {["medicalLicense", "diplomaCertificates", "proofOfID"].map(
                (docKey, idx) => (
                  <div key={idx} className="w-24 h-24 relative">
                    {profileData[docKey] && (
                      <img
                        src={profileData[docKey]}
                        alt={docKey}
                        className="w-full h-full object-cover rounded-lg cursor-pointer"
                        onClick={() => handleImageClick(profileData[docKey])}
                      />
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex gap-1 pt-2">
            <input checked={profileData?.available || false} type="checkbox" />
            <label>Available</label>
          </div>

          {/* Add Doctor Button */}
          <button
            onClick={handleAddDoctor}
            className="mt-4 p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
          >
            Add Doctor
          </button>
        </div>
      </div>

      {/* Modal to display enlarged image with download button */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-lg max-w-[90%] max-h-[90%] overflow-auto">
            <button
              className="absolute top-3 right-3 bg-gray-200 text-gray-800 text-lg w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-300 transition-colors duration-200"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <img
              className="max-w-full max-h-[80vh] object-contain"
              src={modalImage}
              alt="Modal"
            />
            <button
              className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
              onClick={() => handleDownloadPDF(modalImage)}
            >
              Download as PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
