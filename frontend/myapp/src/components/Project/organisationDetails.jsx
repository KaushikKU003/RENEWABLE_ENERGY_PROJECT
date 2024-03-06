import axios from 'axios';
import ProjectsLayout from './ProjectLayout';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
const OrganisationDetails = () => {
    const [org, setOrg] = useState({
        organization_name: '',
        organization_type: '',
        contact_info:''
      });
      const navigate = useNavigate();
      const typeMappings = {
        type1: 'Private',
        type2: 'Government'
        // Add more mappings if needed
      };
      const handleSuccess = (msg) =>
      toast.success(msg, {
        position: "top-right",
      });
      const handleError = (err) =>
      toast.error(err, {
        position: "bottom-left",
      });
      useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('orgDetails_actualform'));
        if (storedData) {
            setOrg(storedData);
        }
      }, []);
    const handleSubmit=(e)=>{
        e.preventDefault();
        const mappedType = typeMappings[org.organization_type];
        console.log(org);
    localStorage.setItem('orgDetails_actualform', JSON.stringify(org));
    localStorage.setItem('orgDetails', JSON.stringify({
      organization_name:org.organization_name,
      organization_type:mappedType,
      contact_info:org.contact_info
    }));
    // Save the form data
    handleSuccess("Project Organisation Details Saved")
    }
    const handleInputChange=(e)=>{
        const { name, value } = e.target;
        setOrg(prevState => ({
          ...prevState,
          [name]: value
        }));
    }
    const NavigationBack=()=>{
      const projectId=localStorage.getItem("project_id")
      navigate(`/locationdetails/${projectId}`)
    }
    
    const uploadDataToBackend= async()=>{
      try {
    const financeDetails = JSON.parse(localStorage.getItem('financeDetails'));
    const benefitsDetails = JSON.parse(localStorage.getItem('benefitsDetails'));
    const riskDetails = JSON.parse(localStorage.getItem('riskDetails'));
    const locationDetails = JSON.parse(localStorage.getItem('locationDetails'));
    const orgDetails = JSON.parse(localStorage.getItem('orgDetails'));
    const projectId=localStorage.getItem("project_id")

    const responses = await Promise.all([
      axios.post(`http://localhost:4000/app/finance/finances/${projectId}`, financeDetails),
      axios.post(`http://localhost:4000/app/benefit/benefits/${projectId}`, benefitsDetails),
      axios.post(`http://localhost:4000/app/risk/risks/${projectId}`, riskDetails),
      axios.post(`http://localhost:4000/app/location/locations/${projectId}`, locationDetails),
      axios.post(`http://localhost:4000/app/organization/organizations/${projectId}`, orgDetails)
    ]);

  //   const response=await axios.post(`http://localhost:4000/app/benefit/benefits/${projectId}`, benefitsDetails)
  //   console.log(response);
  //   console.log("respnse.status is:",response.status);
  //   if (response.status === 200) { // Assuming 201 is the status for successful creation
  //     // projectId = response.data.project_id; // Assuming 'id' is the key for project_id in the response
  //    handleSuccess("Project Details Submitted")
  //    // Redirect to the next form (Project Benefits) with projectId as a route parameter
  //   //  localStorage.setItem("project_id",projectId)
  //  } else {
  //    handleError('Failed to create project1')
  //    throw new Error('Failed to create project');
  //  }
    // console.log("responses is:",responses);
    const allSuccessful = responses.every(response => response.status === 200);
    console.log("All Successful is:",allSuccessful);
    if (allSuccessful) {
      // All requests were successful
      console.log('All requests successful');
      localStorage.clear();
      navigate('/')
    } else {
      // At least one request failed
      console.error('Some requests failed');
      // Identify which request failed
      responses.forEach((response, index) => {
        if (response.status !== true) {
          console.error(`Request ${index + 1} failed for page: ${getPageName(index)}`);
        }
      });
    }

      } catch (error) {
        console.error('Error making requests:', error);
      }
    }
    const getPageName = (index) => {
      switch (index) {
        case 0:
          return 'Finance Details';
        case 1:
          return 'Benefits Details';
        case 2:
          return 'Risk Details';
        case 3:
          return 'Location Details';
        case 4:
          return 'Organization Details';
        default:
          return 'Unknown Page';
      }
    };
    return ( 
        <>
       <ProjectsLayout/>
       <div className="min-h-[95vh] div-bg flex justify-center items-baseline">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[50%] mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-center">Organisation Details</h1>
      <form class='max-w-[75%] m-auto ' onSubmit={handleSubmit}>
      <div>
        <label htmlFor="organization_name" className="block text-gray-700 text-sm font-bold mb-2">Project Organisation Name:</label>
        <input type="text" id="organization_name" name="organization_name" value={org.organization_name} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div>
        <label htmlFor="organization_type" className="block text-gray-700 text-sm font-bold mb-2">Project Organisation Type:</label>
        <select id="organization_type" name="organization_type" value={org.organization_type} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Select Organisation Type</option>
          <option value="type1">Private</option>
          <option value="type2">Government</option>
        </select>
        </div>
      <div>
        <label htmlFor="contact_info" className="block text-gray-700 text-sm font-bold mb-2">Project Contact Number:</label>
        <input type="number" id="contact_info" name="contact_info" value={org.contact_info} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className='flex justify-evenly'>
      <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700" onClick={NavigationBack}>Back</button>
      <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 " >Save</button>
      <button type="upload" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 " onClick={uploadDataToBackend} >Upload</button>
      </div>    
      </form>
      <ToastContainer />
      </div>
</div>
    </>
     );
}
 
export default OrganisationDetails;