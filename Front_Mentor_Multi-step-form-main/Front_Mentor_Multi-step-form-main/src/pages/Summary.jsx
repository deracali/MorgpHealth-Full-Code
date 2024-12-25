import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlansContext from "../context/PlansContext";
import AddOnsContext from "../context/AddOnsContext";
import { PersonalInfoContext } from "../context/PersonalInfoContext";

const Summary = () => {
  const navigate = useNavigate();

  // Accessing Context Data
  const { selectedMonthlyPlan, selectedYearlyPlan } = useContext(PlansContext);
  const { selectedAddOnsValue } = useContext(AddOnsContext);
  const { personalInfo } = useContext(PersonalInfoContext);

  // Determine if monthly or yearly plan is selected
  const planPrice = selectedMonthlyPlan.price || selectedYearlyPlan.price;
  const isMonthly = !!selectedMonthlyPlan.price;
  
  // Calculate total price (plan price + add-ons price)
  const totalAddOnsPrice = selectedAddOnsValue.reduce((acc, item) => acc + item.price, 0);
  const totalPrice = planPrice + totalAddOnsPrice;

  // Handle Confirm Button - Submit data to the server
  const handleConfirm = async () => {
    // Retrieve userId from localStorage
    const userId = localStorage.getItem('userId') || (localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).userId);

    // Redirect to login if no userId is found
    // if (!userId) {
    //   navigate("/login");
    //   return;
    // }

    const insuranceData = {
      userId,
      name: personalInfo.name,
      spouseName: personalInfo.spouseName,
      motherName: personalInfo.motherName,
      fatherName: personalInfo.fatherName,
      childName: personalInfo.childName,
      age: personalInfo.age,
      location: personalInfo.location,
      insured: personalInfo.insured || false,
      spouseAge: personalInfo.spouseAge,
      motherAge: personalInfo.motherAge,
      fatherAge: personalInfo.fatherAge,
      childAge: personalInfo.childAge,
      plan: selectedMonthlyPlan.title || selectedYearlyPlan.title,
      planType: isMonthly ? "Monthly" : "Yearly",
      planPrice,
      addOns: selectedAddOnsValue.map(addOn => ({
        title: addOn.value,
        price: addOn.price,
      })),
      totalPrice,
    };
        // navigate("/thankyou");
    
    try {
      const response = await fetch("https://morgphealth.onrender.com/api/insurance/insurance/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(insuranceData),
      });

      if (response.ok) {
        // Redirect to thank you page after successful submission
      } else {
        console.error("Error submitting data", response);
      }
    } catch (error) {
      console.error("Error connecting to the server", error);
    }
  };

  return (
    <div className="sm:basis-[60%] w-[300px] sm:w-[100%] h-[100%] sm:pr-[80px] text-center">
      <h1 className="mt-10 text-3xl font-[800] mb-2 text-primary-marineBlue">
        Finishing up
      </h1>
      {/* <p className="text-neutral-coolGray mb-6 hidden sm:block">
        Double-check everything looks OK before confirming.
      </p>
      <p className="text-neutral-coolGray mb-6 sm:hidden">
        Double-check everything <br /> looks OK before confirming.
      </p> */}

      {/* Display Personal Info */}
      {/* <div className="bg-neutral-alabaster rounded-lg p-5 mb-6">
        <div className="mb-4">
          <span className="text-primary-marineBlue font-[800]">Name:</span>
          <p className="text-neutral-coolGray">{personalInfo.name}</p>
        </div>
        <div className="mb-4">
          <span className="text-primary-marineBlue font-[800]">Location:</span>
          <p className="text-neutral-coolGray">{personalInfo.location}</p>
        </div>
        <div className="mb-4">
          <span className="text-primary-marineBlue font-[800]">Age:</span>
          <p className="text-neutral-coolGray">{personalInfo.age}</p>
        </div>
      </div> */}

      {/* Display Plan Info */}
      <div className="bg-neutral-alabaster rounded-lg p-5">
        <div className="plan flex justify-between items-center mb-4">
          <div>
            <span className="text-primary-marineBlue font-[800]">
              {selectedMonthlyPlan.title || selectedYearlyPlan.title}
            </span>
            {isMonthly ? (
              <span className="text-primary-marineBlue font-[800]"> (Monthly)</span>
            ) : (
              <span className="text-primary-marineBlue font-[800]"> (Yearly)</span>
            )}
            <p
              onClick={() => navigate("/selectplan")}
              className="text-neutral-coolGray underline cursor-pointer"
            >
              Change
            </p>
          </div>
          <div>
            <span className="text-primary-marineBlue font-[800]">
              ${planPrice}
            </span>
            {isMonthly ? (
              <span className="text-primary-marineBlue font-[800]">/mo</span>
            ) : (
              <span className="text-primary-marineBlue font-[800]">/yr</span>
            )}
          </div>
        </div>

        <hr />

        {selectedAddOnsValue.map((item) => (
          <div key={item.id} className="plan flex justify-between items-center mt-4">
            <div>
              <p className="text-neutral-coolGray">{item.value}</p>
            </div>
            <div>
              <p className="text-primary-marineBlue mb-2 text-[14px] font-[500]">
                +${item.price}/{isMonthly ? "mo" : "yr"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between p-5">
        <div>
          <p className="text-neutral-coolGray">Total ({isMonthly ? "per month" : "per year"})</p>
        </div>
        <div className="text-primary-purplishBlue font-[800]">
          +${totalPrice}/{isMonthly ? "mo" : "yr"}
        </div>
      </div>

      <div className="flex justify-around sm:justify-between items-center sm:pt-[79px]">
        <button
          onClick={() => navigate("/addons")}
          className="text-neutral-coolGray font-[500] capitalize transition-all duration-300 hover:text-primary-marineBlue cursor-pointer"
        >
          Go back
        </button>

        <button
          className="bg-primary-purplishBlue text-white border-0 rounded-md px-6 py-3 transition-all duration-300 hover:opacity-75"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Summary;
