import React, { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TotalSalesChart = ({ totalSales }) => {
  const chartRef = useRef(null); // Ref for the chart container

  const data = {
    labels: ['Total Sales'],
    datasets: [
      {
        label: 'Sales Amount',
        data: [totalSales],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.text("Total Sales Data", 10, 10);

    // Table content
    const tableData = [["Total Sales", totalSales]];

    // Generate the table
    pdf.autoTable({
      head: [['Metric', 'Amount']],
      body: tableData,
      startY: 20,
    });

    pdf.save('TotalSalesData.pdf');
  };

  return (
    <div ref={chartRef} className="bg-white p-4 rounded border-2 border-gray-100">
      <h2 className="text-xl font-semibold">Total Sales</h2>
      <Bar data={data} options={options} />
      <button 
        onClick={downloadPDF} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Download PDF
      </button>
    </div>
  );
};

export default TotalSalesChart;
