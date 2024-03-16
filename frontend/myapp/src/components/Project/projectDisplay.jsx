import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import factory from "../Images/factory.png";
import { Link } from "react-router-dom";

function ProjectDisplay() {
  const { project_id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/app/project/projects/${project_id}`
      );
      setProject(response.data.project);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };
  return (
    <div className="bg-black bg-opacity-95 h-screen flex justify-center items-center">
      {project && (
        <div className="mt-15 md:h-4/5 md:w-4/6 bg-black bg-opacity-95 rounded-3xl md:p-5  shadow-white  shadow-md flex flex-wrap">
          <div className="flex flex-col mb-80 text-white">
            <img src={factory} alt="no-img" className="w-24 h-24 mb-5" />
            <p className="font-bold">Project Name: {project.project_name}</p>
            <p className="font-bold">Type: {project.type}</p>
            <p className="font-bold">
              {" "}
              Established Year: {project.start_date.substring(0, 4)}
            </p>
          </div>

          <div className="flex flex-col mb-96 ml-10 p-3 rounded-lg bg-white">
            <h2 className="text-2xl font-bold">ORGANIZATION DETAILS</h2>
            <p className="font-bold">
              Organization Type: {project.organization_type}
            </p>
            <p className="font-bold">
              Organization Name: {project.organization_name}
            </p>
          </div>

          <div className="mb-96 ml-10 p-3 rounded-lg bg-white relative top-0">
            <h2 className="text-2xl font-bold">LOCATION DETAILS</h2>
            <p className="font-bold">Location name: {project.location_name}</p>
            <p className="font-bold">Country: {project.country}</p>
          </div>

          <div className=" ml-10 p-3 rounded-lg bg-white relative bottom-2/3 left-1/3">
            <h2 className="text-2xl font-bold">BENEFIT DETAILS</h2>
            <p className="font-bold">CO2 Reduction: {project.co2_reduction}</p>
            <p className="font-bold">Other benfits: {project.other_benifits}</p>
          </div>

          <div className=" ml-10 p-3 rounded-lg bg-white relative bottom-1/4 right-24">
            <h2 className="text-2xl font-bold">FINANCE DETAILS</h2>
            <p className="font-bold">Total cost: {project.total_cost}</p>
            <p className="font-bold">
              Funding Source: {project.funding_source}
            </p>

            <p className="font-bold">
              Revenue generation: {project.revenue_generation}
            </p>

            <p className="font-bold">
              Revenue generated: {project.revenue_generated}
            </p>

          </div>

          <div className="ml-10 p-3 rounded-lg bg-white relative bottom-1/4 right-6">
            <h2 className="text-2xl font-bold">RISK DETAILS</h2>
            <p className="font-bold">Impact: {project.impact}</p>
            <p className="font-bold">Likelihood: {project.Likelihood}</p>
            <p className="font-bold">Description: {project.risk_description}</p>
          </div>
          <div className="mb-96 ml-10 p-3 rounded-lg relative bottom-full right-10 mt-20">
            <div class="text-center">
              <Link
                to={`/location/${project.longitude}/${project.latitude}`}
                className="bg-[#1B1A55] hover:bg-[#39368b] text-white font-normal py-3 px-2 rounded focus:outline-none focus:shadow-outline content-center"
              >
                View on Maps
              </Link>
            </div>
          </div>

          <div className="mb-96 ml-10 p-3 rounded-lg relative bottom-full right-56 mt-40">
            <div class="text-center">
              <Link
                to={`/finance/${project_id}`}
                className="bg-[#1B1A55] hover:bg-[#39368b] text-white font-normal py-3 px-2 rounded focus:outline-none focus:shadow-outline content-center"
              >
                Check ROI
              </Link>
            </div>
          </div>

          <div className="mb-96 ml-1 p-3 rounded-lg relative bottom-full right-56 mt-40">
            <div class="text-center">
              <Link
                to={`/benefit/${project_id}`}
                className="bg-[#1B1A55] hover:bg-[#39368b] text-white font-normal py-3 px-2 rounded focus:outline-none focus:shadow-outline content-center"
              >
                Check co2 Reduction
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDisplay;
