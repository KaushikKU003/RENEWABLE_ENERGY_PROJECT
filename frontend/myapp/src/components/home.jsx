import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const ProjectPieChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios(
        "http://localhost:4000/app/project/project-count"
      );
      //   const data = await response.json();
      const data = response.data;
      const labels = data.data.map((item) => item.type);
      const counts = data.data.map((item) => item.count);
      setChartData({ labels, counts });
    } catch (error) {
      console.error("Error fetching project count:", error);
    }
  };

  useEffect(() => {
    if (chartData) {
      renderChart();
    }
  }, [chartData]);

  const renderChart = () => {
    const ctx = document.getElementById("projectChart");

    if (window.myChart instanceof Chart) {
      window.myChart.destroy(); // Destroy the existing chart
    }
    const colors = generateRandomColors(chartData.labels.length); // Generate colors dynamically

    window.myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: chartData.label,
            data: chartData.counts,
            backgroundColor: colors, // Use dynamically generated colors
            borderColor: '#000', // Use dynamically generated colors
            borderWidth: 1,
          },
        ],
      },
      options: {},
    });
  };

  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.5)`;
      colors.push(color);
    }
    return colors;
  };

  return (
    <>
      <center>
       <h1 className="mt-5 text-4xl">PROJECT SUMMARY</h1>
        <div className="flex justify-center items-center h-1/3 w-1/3 mt-10">
          <canvas id="projectChart" ></canvas>
        </div>
      </center>
    </>
  );
};

export default ProjectPieChart;
