import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Register necessary components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const TotalEarningsChart = () => {
    const [chartData, setChartData] = useState({});
    const chartRef = useRef(null); // Ref for the chart container
    const backendUrl = import.meta.env.VITE_BACKEND_URL; // Ensure this is correctly set

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/admin/dashboard`);
                const { dashData } = response.data;

                // Prepare the data for the line chart
                const labels = dashData.earningsChartData.map(item => new Date(item.timestamp).toLocaleDateString());
                const earnings = dashData.earningsChartData.map(item => item.earnings);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Total Earnings',
                            data: earnings,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            fill: true,
                            tension: 0.3, // Smooth the line
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();
    }, [backendUrl]);

    // Function to download data as a table in PDF
    const downloadPDF = () => {
        const pdf = new jsPDF('landscape');
        pdf.text("Total Earnings Over Time", 10, 10);

        // Prepare the table data
        const tableData = chartData.labels.map((label, index) => [
            label,
            chartData.datasets[0].data[index]
        ]);

        // Generate table in PDF
        pdf.autoTable({
            head: [['Date', 'Earnings ($)']],
            body: tableData,
            startY: 20,
        });

        pdf.save('TotalEarningsData.pdf');
    };

    return (
        <div className="chart-container" ref={chartRef}>
            <h2>Total Earnings Over Time</h2>
            {chartData.labels ? (
                <Line 
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Earnings ($)',
                                },
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Date',
                                },
                            },
                        },
                        animation: {
                            duration: 0,
                        },
                    }}
                />
            ) : (
                <p>Loading chart data...</p>
            )}
            <button 
                onClick={downloadPDF} 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Download PDF
            </button>
        </div>
    );
};

export default TotalEarningsChart;
