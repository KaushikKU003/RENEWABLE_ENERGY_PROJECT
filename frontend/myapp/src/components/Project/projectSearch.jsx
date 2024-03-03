import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Select from "react-select";
import { Toaster, toast } from "react-hot-toast";

function ProjectSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState(null);
  const [projects, setProjects] = useState([]);

  console.log(searchType);
  const facultyOptions = [
    { value: "project_name", label: "PROJECT NAME" },
    { value: "type", label: "PROJECT TYPE" },
    { value: "start_date", label: "YEAR" },
  ];

  const handleSearch = async () => {
    try {
      if (!searchType) {
        toast.error("Choose search type");
      } else {
        const response = await axios.get(
          `http://localhost:4000/app/project/projects?searchTerm=${searchTerm}&searchBy=${searchType.value}`
        );

        if (response.data.success === true) {
          setProjects(response.data.data);
        } else {
          console.log("No projects matched");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <center>
        <h2 className="text-5xl">Search Projects</h2>
        <div className="md:flex justify-center mt-10 gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-black w-1/2 h-10  rounded-md"
          />
          <button
            type="submit"
            className="bg-[#1B1A55] hover:bg-[#39368b] text-white font-normal py-1 px-2 rounded focus:outline-none focus:shadow-outline content-center mt-1"onClick={handleSearch}
          >
            SEARCH
          </button>
        </div>
      </center>
      <center>
        <Select
          options={facultyOptions}
          placeholder="Select Search type"
          isSearchable
          value={searchType}
          onChange={setSearchType}
          className="custom-select w-1/2 m-5 border border-blue-500 rounded md:w-1/4"
        />
      </center>

      <div className="flex flex-wrap gap-5 justify-center my-5">
        {projects &&
          projects.map((project) => (
            <div
              key={project.project_id}
              className="mt-10 md:h-40 bg-slate-300 flex flex-col items-center rounded-3xl justify-around md:p-5 md:w-1/4 mx-auto h-1/2 w-1/2 p-5 shadow-black shadow-md"
            >
              <p className="font-bold">Project Name: {project.project_name}</p>
              <p className="font-bold">Type: {project.type}</p>
              <p className="font-bold">
                Year: {project.start_date.substring(0, 4)}
              </p>

              <button
                type="submit"
                className="bg-[#1B1A55] hover:bg-[#39368b] text-white font-normal py-1 px-2 rounded focus:outline-none focus:shadow-outline content-center mt-1"
              >
                VIEW
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProjectSearch;
