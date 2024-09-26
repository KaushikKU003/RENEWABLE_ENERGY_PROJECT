import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { useParams } from "react-router-dom";

function Financemetric() {
  const [LinechartData, setLineChartData] = useState(null);
  const [roi,setroi] = useState("")
  const [name,setName] = useState("")
  const { project_id } = useParams();
  console.log(project_id)

  console.log(roi)

  useEffect(() => {
    fetchData();
  }, []);

  console.log(LinechartData)

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/app/finance/finances/all"
      );

      const data = response.data;
      const labels = data.projectsWithROI.map((item) => item.project_name);
      const counts = data.projectsWithROI.map((item) => item.roi);

      setLineChartData({ labels, counts });


      const response1 = await axios.get(
        `http://localhost:4000/app/finance/finances/${project_id}`
      );

      const data1 = response1.data
      setroi(data1.roi)
      setName(data1.projectName)

    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {LinechartData && (
          <Line
            data={{
              labels: LinechartData.labels,
              datasets: [
                {
                  label: "RETURN ON INVESTMENT",
                  data: LinechartData.counts,
                  fill: false,
                  borderColor: "rgb(75, 192, 192)",
                  borderWidth: 2,
                  tension: 0.1,
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "ROI",
                    color: "white", // Change color of axis title
                    font: {
                      size: 16, // Change font size of axis title
                    },
                  },
                  min: 0,
                  max: 10000, // Set the maximum value for the y-axis
                  grid: {
                    color: "rgba(255, 255, 255, 0.1)", // Change color of grid lines
                  },
                  ticks: {
                    color: "white", // Change color of axis ticks
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Project Name",
                    color: "white", // Change color of axis title
                    font: {
                      size: 16, // Change font size of axis title
                    },
                  },
                  grid: {
                    color: "rgba(255, 255, 255, 0.1)", // Change color of grid lines
                  },
                  ticks: {
                    color: "white", // Change color of axis ticks
                  },
                },
              },
            }}
          />
        )}
      </div>
      <div className="bg-black" style={{ padding: "20px", textAlign: "center" }}>
        <h1 className="text-white mt-5 text-3xl">THE ROI OF PROJECT {name.toLocaleUpperCase()} is<span className="text-[#90fbff]"> {roi} %</span></h1>
      </div>
    </div>
  );
  
}

export default Financemetric;
