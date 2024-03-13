import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Benefits() {
  const { project_id } = useParams();
  const [data, setData] = useState([]);
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/app/benefit/benefits/${project_id}`
      );
      const { values, value } = response.data;

      setData(values);
      setProjectData(value);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full border-collapse border border-[#90fbff] border-4 ">
          <thead>
            <tr className="bg-black font-bold">
              <th className="px-20 py-2 border-[#90fbff] text-[#90fbff] border-4">PROJECT NAME</th>
              <th className="px-20 py-2 border-[#90fbff] text-[#90fbff]  border-4">CO2 REDUCTION</th>
              <th className="px-20 py-2 border-[#90fbff] text-[#90fbff] border-4">YEAR</th>
            </tr>
          </thead>
          <tbody>
            {data.map((project) => (
              <tr key={project.project_name} className="bg-black border-[#90fbff] text-white  border-4 ">
                <td className="border-[#90fbff] px-20 py-2  border-4">{project.project_name}</td>
                <td className="border-[#90fbff] px-20 py-2 font-bold">
                  {project.co2_reduction}%
                </td>
                <td className="border-[#90fbff] px-20 py-2  border-4">{project.YEAR}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <center>
          {" "}
          <h1 className="text-white mt-5 text-2xl">
            The CO2 reduction level of project {projectData.project_name} is{" "}
           <span className="text-[#90fbff]"> {projectData.co2_reduction} %</span>
          </h1>
        </center>
      </div>
    </div>
  );
}

export default Benefits;
