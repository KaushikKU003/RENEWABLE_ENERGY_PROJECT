import ProjectsLayout from './ProjectLayout';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
const ProjectRisks = () => {
    const [risks, setRisks] = useState({
        impact: '',
        Likelihood: '',
        risk_description:''
      });
      const navigate = useNavigate();
      const typeMappings1 = {
        type1: 'Critical',
        type2: 'High',
        type3: 'Moderate',
        type4: 'Low',
        // Add more mappings if needed
      };
      const typeMappings2={
        type1:'High',
        type2:'Moderate',
        type3:'Low'
      }
      const handleSuccess = (msg) =>
      toast.success(msg, {
        position: "top-right",
      });
      useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('riskDetails_actual'));
        if (storedData) {
            setRisks(storedData);
        }
      }, []);
    const handleSubmit=(e)=>{
        e.preventDefault();
        const mappedType1 = typeMappings1[risks.impact];
        const mappedType2 = typeMappings2[risks.Likelihood];
    // Save the form data
    localStorage.setItem('riskDetails_actual', JSON.stringify(risks));
    localStorage.setItem('riskDetails', JSON.stringify({
      impact:mappedType1,
      Likelihood:mappedType2,
      risk_description:risks.risk_description
    }));
    handleSuccess("Project Risk Details Saved")
    setTimeout(() => {
    }, 500)
    console.log(risks);
    }
    const handleInputChange=(e)=>{
        const { name, value } = e.target;
        setRisks(prevState => ({
          ...prevState,
          [name]: value
        }));
    }
    const NavigationFront=()=>{
      const projectId=localStorage.getItem("project_id")
      navigate(`/locationdetails/${projectId}`)
    }
    const NavigationBack=()=>{
      const projectId=localStorage.getItem("project_id")
      navigate(`/benifitsdetails/${projectId}`)
    }
    return ( 
        <>
       <ProjectsLayout/>
       <div className="min-h-[95vh] div-bg flex justify-center items-baseline">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[50%] mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-center">Risk Details</h1>
      <form class='max-w-[75%] m-auto ' onSubmit={handleSubmit}>
      <div>
        <label htmlFor="impact" className="block text-gray-700 text-sm font-bold mb-2">Environmental Impact on Project:</label>
        {/* <input type="text" id="impact" name="impact" value={risks.impact} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /> */}
        <select id="impact" name="impact" value={risks.impact} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Select Impact Type</option>
          <option value="type1">Critical Impact</option>
          <option value="type2">High Impact</option>
          <option value="type3">Moderate Impact</option>
          <option value="type4">Low Impact</option>
        </select>
      </div>
      <div>
        <label htmlFor="Likelihood" className="block text-gray-700 text-sm font-bold mb-2">Risks Liklihood:</label>
        {/* <input type="text" id="Likelihood" name="Likelihood" value={risks.Likelihood} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /> */}
        <select id="Likelihood" name="Likelihood" value={risks.Likelihood} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Select Likelihood Type</option>
          <option value="type1">High</option>
          <option value="type2">Moderate </option>
          <option value="type3">Low </option>
        </select>
      </div>
      <div>
        <label htmlFor="risk_description" className="block text-gray-700 text-sm font-bold mb-2">Other Risk Description:</label>
        <input type="text" id="risk_description" name="risk_description" value={risks.risk_description} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className='flex justify-evenly'>
      <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700" onClick={NavigationBack}>Back</button>
      <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 " >Save</button>
      <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 " onClick={NavigationFront}>Next</button>
      </div>    
      </form>
      <ToastContainer />
      </div>
</div>
    </>
     );
}
 
export default ProjectRisks;