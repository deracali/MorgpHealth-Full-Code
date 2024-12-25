import React, { useEffect, useState, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Register necessary components
Chart.register(ArcElement, Tooltip, Legend);

const UsersDoctorsPieChart = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/admin/dashboard`);
                const { dashData } = response.data;

                // Prepare data for the pie chart
                const data = {
                    labels: ['Doctors', 'Users'],
                    datasets: [
                        {
                            label: 'Count',
                            data: [dashData.doctors, dashData.patients],
                            backgroundColor: [
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(255, 99, 132, 0.6)',
                            ],
                            hoverBackgroundColor: [
                                'rgba(75, 192, 192, 1)',
                                'rgba(255, 99, 132, 1)',
                            ],
                        },
                    ],
                };

                setChartData(data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();
    }, [backendUrl]);

    const downloadPDF = () => {
        const pdf = new jsPDF();
        pdf.text("Doctors and Users Distribution", 10, 10);

        // Table content
        const tableData = chartData.labels.map((label, index) => [
            label,
            chartData.datasets[0].data[index],
        ]);

        // AutoTable
        pdf.autoTable({
            head: [['Category', 'Count']],
            body: tableData,
            startY: 20,
        });

        pdf.save('Doctors_Users_Distribution.pdf');
    };

    return (
        <div ref={chartRef} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Doctors and Users Distribution</h2>
            {chartData.labels.length > 0 ? (
                <Pie
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        animation: { duration: 0 },
                    }}
                />
            ) : (
                <p>Loading chart data...</p>
            )}
            <button
                onClick={downloadPDF}
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
                Download PDF
            </button>
        </div>
    );
};

export default UsersDoctorsPieChart;
