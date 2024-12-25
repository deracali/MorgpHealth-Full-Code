import { createContext, useState } from "react";

const AddOnsContext = createContext();

export const AddOnsProvider = ({ children }) => {
  const [addOns, setAddOns] = useState([
    {
      id: 1,
      value: "Premium Cover",
      desc: "Access to full health insurance",
      price: 150,
    },
    {
      id: 2,
      value: "Gold Cover",
      desc: "Access to limited health insurance",
      price: 125,
    },
    {
      id: 3,
      value: "Platinum Cover",
      desc: "Access to minimal health insurance",
      price: 83,
    },
  ]);

  const [selectedAddOnsValue, setSelectedAddOnsValue] = useState([]);

  return (
    <AddOnsContext.Provider
      value={{
        addOns,
        setAddOns,
        selectedAddOnsValue,
        setSelectedAddOnsValue
      }}
    >
      {children}
    </AddOnsContext.Provider>
  );
};

export default AddOnsContext;
