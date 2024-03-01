// import ProjectsLayout from "./Project/AllPages/ProjectLayout";
import { Link } from "react-router-dom";
import create_project from "../Images/create_project.png"
import search_project from "../Images/search_project.png"
const Project = () => {
  return (
    <>
      <div class="h-screen flex justify-around items-center ">
        <div>
          <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img
              class="w-full"
              src={create_project}
              alt="create new projects"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">Create New projects</div>
              <p class="text-gray-700 text-base">
                You can create new renewable Projects along with other details
              </p>
              <div class="text-center">
              <Link
                  to="/projectsdetails" // Specify the path to navigate to
                  className="bg-[#1B1A55] hover:bg-[#39368b] text-white font-normal py-1 px-2 rounded focus:outline-none focus:shadow-outline content-center mt-1"
                >
                  Create
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img
              class="w-full"
              src={search_project}
              alt="search for prjects"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">Search For Projects</div>
              <p class="text-gray-700 text-base">
                Search for the existing renwable projects in the world
              </p>
              <div class="text-center">
              <button type="submit"
                      
                      className="bg-[#1B1A55] hover:bg-[#39368b] text-white font-normal py-1 px-2 rounded focus:outline-none focus:shadow-outline content-center mt-1">
                  Search
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
