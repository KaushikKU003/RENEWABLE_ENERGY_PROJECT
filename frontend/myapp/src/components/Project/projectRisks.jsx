import ProjectsLayout from './ProjectLayout';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
const ProjectRisks = () => {
    const [risks, setRisks] = useState({
        impact: '',
        likelihood: '',
        riskdetails:''
      });
      const navigate = useNavigate();
      const handleSuccess = (msg) =>
      toast.success(msg, {
        position: "top-right",
      });
      useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('riskDetails'));
        if (storedData) {
            setRisks(storedData);
        }
      }, []);
    const handleSubmit=(e)=>{
        e.preventDefault();
    // Save the form data
    handleSuccess("Project Risk Details Saved")
    setTimeout(() => {
    }, 500)
    console.log(risks);
    localStorage.setItem('riskDetails', JSON.stringify(risks));
    }
    const handleInputChange=(e)=>{
        const { name, value } = e.target;
        setRisks(prevState => ({
          ...prevState,
          [name]: value
        }));
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
        <input type="text" id="impact" name="impact" value={risks.impact} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div>
        <label htmlFor="likelihood" className="block text-gray-700 text-sm font-bold mb-2">Risks Liklihood:</label>
        <input type="text" id="likelihood" name="likelihood" value={risks.likelihood} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div>
        <label htmlFor="riskdetails" className="block text-gray-700 text-sm font-bold mb-2">Other Risk Details:</label>
        <input type="text" id="riskdetails" name="riskdetails" value={risks.riskdetails} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className='flex justify-evenly'>
      <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700" onClick={() => navigate('/benifitsdetails')}>Back</button>
      <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 " >Save</button>
      <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 " onClick={() => navigate('/locationdetails')}>Next</button>
      </div>    
      </form>
      <ToastContainer />
      </div>
</div>
    </>
     );
}
 
export default ProjectRisks;