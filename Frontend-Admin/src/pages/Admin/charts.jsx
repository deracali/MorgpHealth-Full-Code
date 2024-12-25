import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const RecentResultsChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Get the canvas context
    const ctx = chartRef.current.getContext('2d');

    // Create gradient for the fill color
    const gradientFill = ctx.createLinearGradient(0, 0, 0, 200);
    gradientFill.addColorStop(0.1, "rgba(109,110,227, .3)");
    gradientFill.addColorStop(1, "rgba(255,255,255, .3)");

    // Data configuration
    const data = {
      labels: ["", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", ""],
      datasets: [
        {
          backgroundColor: gradientFill,
          borderColor: "#6d6ee3",
          borderWidth: 2,
          fill: true,
          data: [3, 5, 4, 10, 8, 9, 3, 15, 14, 17],
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    };

    // Options configuration
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          mode: 'index',
          intersect: true,
          padding: 10,
          caretSize: 8,
          backgroundColor: '#fff',
          titleColor: "#6d6ee3",
          bodyColor: "#737295",
          displayColors: false,
          callbacks: {
            label: () => "10.5",
          },
        },
      },
      showAllTooltips: true,
      scales: {
        y: {
          ticks: {
            maxTicksLimit: 5,
            min: 0,
          },
          grid: {
            display: true,
          },
        },
        x: {
          ticks: {
            fontSize: 12,
            color: '#c3c6de',
          },
          grid: {
            display: false,
          },
        },
      },
      elements: {
        point: {
          radius: 0,
        },
      },
    };

    // Initialize the chart
    const myLineChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });

    // Cleanup on component unmount
    return () => {
      myLineChart.destroy();
    };
  }, []);

  return (
    <div className="relative w-full h-64">
      <canvas ref={chartRef} />
    </div>
  );
};

export default RecentResultsChart;
