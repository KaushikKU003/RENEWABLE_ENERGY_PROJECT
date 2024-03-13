import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const ProjectPieChart = () => {
  const [chartData, setChartData] = useState(null);
  const [barchartData, setbarchartData] = useState(null);

  console.log(barchartData);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios(
        "http://localhost:4000/app/project/project-count"
      );

      const data = response.data;
      const labels = data.data.map((item) => item.type);
      const counts = data.data.map((item) => item.count);
      setChartData({ labels, counts });

      const response1 = await axios(
        "http://localhost:4000/app/project/projects/year"
      );

      const data1 = response1.data;
      const labels1 = data1.data.map((item) => item.year);
      const counts1 = data1.data.map((item) => item.project_count);
      setbarchartData({ labels1, counts1 });
    } catch (error) {
      console.error("Error fetching project count:", error);
    }
  };

  useEffect(() => {
    if (chartData) {
      renderChart();
    }
    if (barchartData) {
      renderBarChart();
    }
  }, [chartData, barchartData]);

  const renderChart = () => {
    const ctx = document.getElementById("projectChart");

    if (window.myChart instanceof Chart) {
      window.myChart.destroy();
    }
    const colors = generateRandomColors(chartData.labels.length);

    window.myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: chartData.label,
            data: chartData.counts,
            backgroundColor: colors,
            borderColor: "#000",
            borderWidth: 1,
          },
        ],
      },
      options: {},
    });
  };

  const renderBarChart = () => {
    const ctx = document.getElementById("projectBarChart");

    if (window.myBarChart instanceof Chart) {
      window.myBarChart.destroy();
    }
    const colors = generateRandomColors(barchartData.labels1.length); // Generate colors dynamically

    window.myBarChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: barchartData.labels1,
        datasets: [
          {
            label: "Project Count by Year",
            data: barchartData.counts1,
            backgroundColor: colors, // Use dynamically generated colors
            borderColor: "#000", // Use dynamically generated colors
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
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
    <div className="bg-[#f8e7e7] bg-opacity-95 text-black min-h-screen font-monospace font-bold">
      <center>
        <h1 className=" text-4xl">PROJECT SUMMARY</h1>
      </center>
      <div className="flex h-1/3 w-1/3 mt-10 gap-72">
        <canvas id="projectChart"></canvas>
        <canvas id="projectBarChart" className="mt-20"></canvas>
      </div>
    </div>
  );
};

export default ProjectPieChart;
