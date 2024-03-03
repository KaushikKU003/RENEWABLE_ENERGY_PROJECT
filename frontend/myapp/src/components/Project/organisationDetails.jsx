import ProjectsLayout from './ProjectLayout';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
const OrganisationDetails = () => {
    const [org, setOrg] = useState({
        org_name: '',
        location_country: '',
        location_lat:'',
        location_lon:''
      });
      const navigate = useNavigate();
      const handleSuccess = (msg) =>
      toast.success(msg, {
        position: "top-right",
      });
      useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('orgDetails'));
        if (storedData) {
            setOrg(storedData);
        }
      }, []);
    const handleSubmit=(e)=>{
        e.preventDefault();
    // Save the form data
    handleSuccess("Project Organisation Details Saved")
    setTimeout(() => {
    }, 500)
    console.log(org);
    localStorage.setItem('orgDetails', JSON.stringify(org));
    }
    const handleInputChange=(e)=>{
        const { name, value } = e.target;
        setOrg(prevState => ({
          ...prevState,
          [name]: value
        }));
    }
    return ( 
        <>
       <ProjectsLayout/>
       <div className="min-h-[95vh] div-bg flex justify-center items-baseline">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[50%] mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-center">Organisation Details</h1>
      <form class='max-w-[75%] m-auto ' onSubmit={handleSubmit}>
      <div>
        <label htmlFor="org_name" className="block text-gray-700 text-sm font-bold mb-2">Project Organisation Name:</label>
        <input type="text" id="org_name" name="org_name" value={org.org_name} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div>
        <label htmlFor="org_type" className="block text-gray-700 text-sm font-bold mb-2">Project Organisation Type:</label>
        <select id="org_type" name="org_type" value={org.org_type} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Select Organisation Type</option>
          <option value="type1">Private</option>
          <option value="type2">Government</option>
        </select>
        </div>
      <div>
        <label htmlFor="org_mail" className="block text-gray-700 text-sm font-bold mb-2">Project Email-id:</label>
        <input type="email" id="org_mail" name="org_mail" value={org.org_mail} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className='flex justify-evenly'>
      <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700" onClick={() => navigate('/risksdetails')}>Back</button>
      <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 " >Save</button>
      <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 " >Upload</button>
      </div>    
      </form>
      <ToastContainer />
      </div>
</div>
    </>
     );
}
 
export default OrganisationDetails;