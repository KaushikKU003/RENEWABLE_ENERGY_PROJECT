import ProjectsLayout from './ProjectLayout';
import React, { useState } from 'react';
const ProjectDetails = () => {
  const [currentlyWorking, setCurrentlyWorking] = useState(false);

  const handleStatusChange = (e) => {
    setCurrentlyWorking(e.target.checked);
  };
  return (
    <>
      <ProjectsLayout/>
        <div className="min-h-[95vh] bg-gray-50">
        <form>
      <div>
        <label htmlFor="project_name" className="block">Project Name:</label>
        <input type="text" id="project_name" name="project_name" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div>
        <label htmlFor="project_type" className="block">Project Type:</label>
        <input type="text" id="project_type" name="project_type" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div>
        <label htmlFor="capacity" className="block">Capacity:</label>
        <input type="number" id="capacity" name="capacity" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div>
        <label htmlFor="start_date" className="block">Start Date:</label>
        <input type="date" id="start_date" name="start_date" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div>
        <label htmlFor="end_date" className="block">End Date:</label>
        <input type="date" id="end_date" name="end_date" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" disabled={currentlyWorking} />
      </div>
      <div className="flex items-center">
        <input type="checkbox" id="status" name="status" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" onChange={handleStatusChange} />
        <label htmlFor="status" className="ml-2 block">Currently Working</label>
      </div>
      <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">Submit</button>
    </form>

        </div>
    </>
  );
}

export default ProjectDetails;


// import { Outlet, Link } from "react-router-dom";
// const projectDetails = () => {
//     return ( 
//         <>
//         <div class="h-screen flex justify-end ">
//             <div class="w-3/4 mr-0 bg-red-700">
//                 <p class="text-center">This div takes up 100vh of the viewport height and 75vw of the viewport width, leaving some space on the left and right sides.</p>
//             </div>
//         </div>
//         </>
//      );
// }
 
// export default projectDetails;
// const ProjectDetails = () => {
//     return ( 
//         <>
//         <div className="h-screen flex justify-end">
//             <div className="w-3/4 mr-0 bg-red-700">
//                 <p className="text-center">This div takes up 100vh of the viewport height and 75vw of the viewport width, leaving some space on the left and right sides.</p>
//             </div>
//         </div>
//         </>
//     );
//   }
  
//   export default ProjectDetails;
  