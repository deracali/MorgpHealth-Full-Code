import React, { useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const GenderRegionPieChart = ({ title, genderRegionData }) => {
    const chartRef = useRef(null);

    if (!genderRegionData || typeof genderRegionData !== 'object') {
        return <div>No data available for {title}</div>;
    }

    const chartData = {
        labels: [],
        datasets: [
            {
                label: title,
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
            },
        ],
    };

    Object.keys(genderRegionData).forEach(gender => {
        Object.keys(genderRegionData[gender]).forEach(region => {
            chartData.labels.push(`${gender} - ${region}`);
            chartData.datasets[0].data.push(genderRegionData[gender][region]);
        });
    });

    const downloadPDF = () => {
        const pdf = new jsPDF();
        pdf.text(title, 10, 10);

        // Prepare data in tabular form for pdf
        const tableData = [];
        Object.keys(genderRegionData).forEach(gender => {
            Object.keys(genderRegionData[gender]).forEach(region => {
                tableData.push([gender, region, genderRegionData[gender][region]]);
            });
        });

        // Use jsPDF's autoTable plugin to create a table in the PDF
        pdf.autoTable({
            head: [['Gender', 'Region', 'Count']],
            body: tableData,
            startY: 20,
        });

        pdf.save(`${title}.pdf`);
    };

    return (
        <div ref={chartRef} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <Pie data={chartData} options={{ maintainAspectRatio: true }} />
            <button 
                onClick={downloadPDF} 
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
                Download PDF
            </button>
        </div>
    );
};

export default GenderRegionPieChart;
