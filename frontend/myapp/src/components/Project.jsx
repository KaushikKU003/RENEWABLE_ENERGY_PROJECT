// import ProjectsLayout from "./Project/AllPages/ProjectLayout";
import { Link } from "react-router-dom";
import create_project from "../components/Images/create_project.png"
import search_project from "../components/Images/search_project.png"
// import { useNavigate } from "react-router-dom";
const Project = () => {
  // const navigate=useNavigate()
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
                  className="bg-[#3d3d3d] hover:text-[#3d3d3d] hover:bg-[#b9b9b9] hover:font-bold text-white font-normal py-2 px-3 rounded focus:outline-none focus:shadow-outline content-center mt-1"
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
              <Link
                  to="/search" // Specify the path to navigate to
                  className="bg-[#3d3d3d] hover:text-[#3d3d3d] hover:bg-[#b9b9b9] hover:font-bold text-white font-normal py-2 px-3 rounded focus:outline-none focus:shadow-outline content-center mt-1"
                >
                  Search
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
