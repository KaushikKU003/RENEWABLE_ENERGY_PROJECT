import ProjectsLayout from './ProjectLayout';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

import "../CSS/projDetails.css"
const ProjectDetails = () => {
  let projectId;
  const [formData, setFormData] = useState({
    project_name: "",
    project_type: "",
    capacity: "",
    start_date: "",
    end_date: "",
    status: false // assuming it's boolean
  });
const handleSuccess = (msg) =>
  toast.success(msg, {
    position: "top-right",
  });
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const navigate = useNavigate();
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('projectDetails_actualform'));
    if (storedData) {
      setFormData(storedData);
    }
  }, []);
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const typeMappings = {
    type1: 'Solar Power Plant',
    type2: 'Wind Mill',
    type3: 'Tidal'
    // Add more mappings if needed
  };
  const handleSubmit =async (e) => {
    e.preventDefault();
    // Save the form data
    const mappedType = typeMappings[formData.project_type];
    const status = formData.status ? 'In Progress' : 'Completed';
    console.log(formData);
    localStorage.setItem('projectDetails_actualform', JSON.stringify(formData));
  
    // Store the data in local storage as projectDetails
    localStorage.setItem('projectDetails', JSON.stringify({
      project_name: formData.project_name,
        type: mappedType,
        capacity: formData.capacity,
        status: status,
        start_date: formData.start_date,
        end_date: formData.end_date
    }));
    try {
      const response = await axios.post('http://localhost:4000/app/project/projects', 
      {project_name: formData.project_name,
        type: mappedType,
        capacity: formData.capacity,
        status: status,
        start_date: formData.start_date,
        end_date: formData.end_date}
      );
      console.log(response);
      if (response.status === 200) { // Assuming 201 is the status for successful creation
         projectId = response.data.project_id; // Assuming 'id' is the key for project_id in the response
        handleSuccess("Project Details Submitted")
        // Redirect to the next form (Project Benefits) with projectId as a route parameter
        localStorage.setItem("project_id",projectId)
      } else {
        handleError('Failed to create project1')
        throw new Error('Failed to create project');
      }
    } catch (error) {
      handleError('Failed to create project2')
      console.error('Error creating project:', error);
    }
  };
  const [currentlyWorking, setCurrentlyWorking] = useState({
    status: false
  });

  const handleStatusChange = (e, fieldName) => {
    const checked = e.target.checked;
    console.log("Checkbox State:", checked);
    setCurrentlyWorking((prevState) => ({
      ...prevState,
      [fieldName]: checked
    }));
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: checked,
      end_date: checked ? null : formData.end_date
    }));
    console.log("Form Data:", formData);
    // Save checkbox state to local storage
  };
  
  
  const NavigationFront=()=>{
    const projectId=localStorage.getItem("project_id")
    navigate(`/financesdetails/${projectId}`)
  }
  
  

  return (
    <>
      <ProjectsLayout/>
      <div className="min-h-[95vh] bg-[#202020] flex justify-center items-baseline">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[50%] mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-center">Project Details</h1>
      
      <form class='max-w-[75%] m-auto ' onSubmit={handleSubmit}>
      <div>
        <label htmlFor="project_name" className="block text-gray-700 text-sm font-bold mb-2">Project Name:</label>
        <input type="text" id="project_name" name="project_name" value={formData.project_name} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div>
        <label htmlFor="project_type" className="block text-gray-700 text-sm font-bold mb-2">Project Type:</label>
        <select id="project_type" name="project_type" value={formData.project_type} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Select Project Type</option>
          <option value="type1">Solar Power Plant</option>
          <option value="type2">Wind Mill</option>
          <option value="type3">Tidal</option>
        </select>
        </div>
      <div>
        <label htmlFor="capacity" className="block text-gray-700 text-sm font-bold mb-2">Capacity:</label>
        <input type="number" id="capacity" name="capacity" value={formData.capacity} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div>
        <label htmlFor="start_date" className="block text-gray-700 text-sm font-bold mb-2 ">Start Date:</label>
        <input type="date" id="start_date" name="start_date" value={formData.start_date} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer" />
      </div>
      <div>
        <label htmlFor="end_date" className="block text-gray-700 text-sm font-bold mb-2">End Date:</label>
        <input 
  type="date" 
  id="end_date" 
  name="end_date" 
  className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer" 
  value={formData.end_date || ''} 
  onChange={handleInputChange} 
  disabled={currentlyWorking.status} 
/></div>
      <div className="flex items-center">
        <input type="checkbox" id="status" name="status" checked={currentlyWorking.status}
        onChange={(e) => handleStatusChange(e, "status")} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
        <label htmlFor="status" className="ml-2 block" >Currently Working</label>
      </div>
      <div className='flex justify-evenly'>
      <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700" >Save</button>
      <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 " onClick={NavigationFront}>Next</button>
      </div>
    </form>
    <ToastContainer />
      </div>
</div>
    </>
  );
}

export default ProjectDetails;


