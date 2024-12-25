import React, { createContext, useState } from "react";

// Create the context
export const PersonalInfoContext = createContext();

// Create the provider component
export const PersonalInfoProvider = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState({
    userId: "",
    spouseName: "",
    motherName: "",
    fatherName: "",
    childName: "",
    age: "",
    spouseAge: "",
    motherAge: "",
    fatherAge: "",
    childAge: "",
    location: "",
    country: "",
  });

  return (
    <PersonalInfoContext.Provider value={{ personalInfo, setPersonalInfo }}>
      {children}
    </PersonalInfoContext.Provider>
  );
};
