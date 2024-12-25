import { BrowserRouter, Routes, Route } from "react-router-dom";
import PersonalInfo from "./pages/PersonalInfo";
import SelectPlan from "./pages/SelectPlan";
import AddOns from "./pages/AddOns";
import Summary from "./pages/Summary";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/Sidebar";
import { PlansProvider } from "./context/PlansContext";
import { AddOnsProvider } from "./context/AddOnsContext";
import ThankYou from "./pages/ThankYou";

const App = () => {
  return (
    <PlansProvider>
      <AddOnsProvider>
        <BrowserRouter>
        <div className="bg-white w-full sm:w-[40rem] md:w-[50rem] lg:w-[60rem] h-auto sm:h-[30rem] mt-[100px] sm:mt-0 rounded-xl shadow-xl p-4 flex flex-col sm:flex-row justify-between">

            <Sidebar />
            <Routes>
              <Route path="/" element={<PersonalInfo />} />
              <Route path="/selectplan" element={<SelectPlan />} />
              <Route path="/addons" element={<AddOns />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="/thankyou" element={<ThankYou />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AddOnsProvider>
    </PlansProvider>
  );
};

export default App;
