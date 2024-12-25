import React from "react";
import RecentResultsChart from "./charts";

const Dashboard = () => {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between bg-white p-4">
        <a
          href="#"
          className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white px-4 py-2 rounded-md font-semibold"
        >
          Make an appointment
        </a>
        
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6 space-y-8">
        {/* Top Section */}
        <div className="flex flex-wrap gap-6">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-semibold">Upcoming appointments</h1>
              <a href="#">
                <i className="fa fa-ellipsis-h text-gray-400"></i>
              </a>
            </div>
            <div className="space-y-4">
              {[
                {
                  img: "45",
                  name: "Dr Anthony Wagner",
                  title: "Dermatologist",
                  date: "22/07/2018",
                  time: "2:30 PM",
                },
                {
                  img: "1",
                  name: "Dr Caroline Fields",
                  title: "Psychologist",
                  date: "22/07/2018",
                  time: "2:30 PM",
                },
                {
                  img: "30",
                  name: "Dr Natalie Smith",
                  title: "Dentist",
                  date: "22/07/2018",
                  time: "2:30 PM",
                },
              ].map((appointment, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4"
                >
                  <img
                    src={`https://i.pravatar.cc/150?img=${appointment.img}`}
                    alt={appointment.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <span className="block font-semibold">
                      {appointment.name}
                    </span>
                    <span className="block text-gray-500">{appointment.title}</span>
                    <span className="block text-gray-500">
                      <i className="fa fa-calendar"></i> {appointment.date}
                    </span>
                    <span className="block text-gray-500">
                      <i className="fas fa-clock"></i> {appointment.time}
                    </span>
                  </div>
                  <a href="#" className="text-green-500">
                    <i className="far fa-check-circle"></i>
                  </a>
                  <a href="#" className="text-red-500">
                    <i className="far fa-times-circle"></i>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Results */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-xl font-semibold">Recent results</h1>
                <span className="text-gray-500">Glucose</span>
              </div>
              <select className="border-none bg-transparent outline-none">
                <option value="May 2018">May 2018</option>
              </select>
              <a href="#">
                <i className="fa fa-ellipsis-h text-gray-400"></i>
              </a>
            </div>
            <div className="flex justify-center mt-[50px] items-center h-48">
            <RecentResultsChart />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-wrap gap-6">
          {/* News */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-semibold">News</h1>
              <a href="#">
                <i className="fa fa-ellipsis-h text-gray-400"></i>
              </a>
            </div>
            <ul className="space-y-4">
              {[
                {
                  title: "10% off for dermatologist consultation",
                  subtitle: "Save money for first visit",
                },
                {
                  title: "Free visit to the cardiologist on May 2-6",
                  subtitle: "Take care Of your health, do medical examination",
                },
                {
                  title: "50% discount on allergy tests",
                  subtitle: "Spring is coming, take control Of allergy",
                },
              ].map((news, index) => (
                <li key={index}>
                  <a href="#" className="block">
                    <span className="block font-semibold">{news.title}</span>
                    <span className="text-gray-500">{news.subtitle}</span>
                    <i className="fas fa-caret-right"></i>
                    <hr className="my-2" />
                  </a>
                </li>
              ))}
              <li className="text-blue-500">
                <a href="#">More...</a>
              </li>
            </ul>
          </div>

          {/* Current Prescription */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-semibold">Current prescription</h1>
              <a href="#">
                <i className="fa fa-ellipsis-h text-gray-400"></i>
              </a>
            </div>
            <ul className="space-y-4">
              {[
                { title: "Vitamin D", description: "5mg - 2x per day" },
                { title: "Cetirizine", description: "10mg - once per day" },
              ].map((prescription, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="font-semibold">{prescription.title}</span>
                  <span className="text-gray-500">{prescription.description}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-semibold">Notifications</h1>
              <a href="#">
                <i className="fa fa-ellipsis-h text-gray-400"></i>
              </a>
            </div>
            <ul className="space-y-4">
              <li>
                <a href="#" className="block">
                  <span className="block font-semibold">You confirmed a visit</span>
                  <span className="text-gray-500">2 days ago</span>
                </a>
              </li>
              <li>
                <a href="#" className="block">
                  <span className="block font-semibold">Your results are available</span>
                  <span className="text-gray-500">3 days ago</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
