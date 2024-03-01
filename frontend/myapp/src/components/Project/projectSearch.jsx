import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Select from "react-select";
import { Toaster, toast } from "react-hot-toast";

function ProjectSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState(null);
  const [projects, setProjects] = useState([]);

  console.log(searchType)
  const facultyOptions = [
    { value: "project_name", label: "PROJECT NAME" },
    { value: "type", label: "PROJECT TYPE" },
  ];

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/app/project/projects?searchTerm=${searchTerm}&searchBy=${searchType.value}`
      );

      if (response.data.success === true) {
        setProjects(response.data.data);
      } else {
        console.log("No projects matched");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-center mt-20 gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-black w-1/2 h-10 mt-6"
        />
        <button
          onClick={handleSearch}
          className=" px-7 rounded-3xl bg-green-400"
        >
          Search
        </button>

        <Select
          options={facultyOptions}
          placeholder="Select Search type"
          isSearchable
          value={searchType}
          onChange={setSearchType}
          className="custom-select w-1/4 m-5 border border-blue-500 rounded"
        />
      </div>
      {projects && (
        <div>
          <h2>Projects:</h2>
          <ul>
            {projects.map((project) => (
              <li key={project.project_id}>
                Project Name: {project.project_name}, Type: {project.type}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProjectSearch;
