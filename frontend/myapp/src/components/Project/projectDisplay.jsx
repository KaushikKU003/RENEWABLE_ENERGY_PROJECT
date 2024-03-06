import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
    <div className="bg-black h-screen flex justify-center items-center">
      {project && (
        <div className="mt-15 md:h-4/5 md:w-4/6 bg-green-300 flex flex-col items-center rounded-3xl justify-around md:p-5 mx-auto p-5 shadow-black shadow-md">
          <p className="font-bold">Project Name: {project.project_name}</p>
          <p className="font-bold">Type: {project.type}</p>
          <p className="font-bold">Year: {project.start_date.substring(0, 4)}</p>
        </div>
      )}
    </div>
  );
  
}

export default ProjectDisplay;
