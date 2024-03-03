import ProjectsLayout from './ProjectLayout';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
const FinanceDetails = () => {

  const [financeDetails, setFinanceDetails] = useState({
    total_cost: '',
    funding_source: '',
    revenue_generation: '',
    project_returns: ''
  });
  const handleSuccess = (msg) =>
  toast.success(msg, {
    position: "top-right",
  });

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFinanceDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('financeDetails'));
    if (storedData) {
      setFinanceDetails(storedData);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSuccess("Finance Details Saved")
    setTimeout(() => {
    }, 500)
    console.log(financeDetails);
    localStorage.setItem('financeDetails', JSON.stringify(financeDetails));
  };

  return (
    <>
       <ProjectsLayout/>
       <div className="min-h-[95vh] div-bg flex justify-center items-baseline">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[50%] mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-center">Finance Details</h1>
      <form class='max-w-[75%] m-auto ' onSubmit={handleSubmit}>
      <div>
        <label htmlFor="total_cost" className="block text-gray-700 text-sm font-bold mb-2">Project Total Cost:</label>
        <input type="text" id="total_cost" name="total_cost" value={financeDetails.total_cost} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div>
        <label htmlFor="funding_source" className="block text-gray-700 text-sm font-bold mb-2">Project Funding Source:</label>
        <input type="number" id="funding_source" name="funding_source" value={financeDetails.funding_source} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div>
        <label htmlFor="revenue_generation" className="block text-gray-700 text-sm font-bold mb-2">Project Revenue Generation:</label>
        <input type="number" id="revenue_generation" name="revenue_generation" value={financeDetails.revenue_generation}  onChange={handleInputChange}className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div>
        <label htmlFor="project_returns" className="block text-gray-700 text-sm font-bold mb-2">Return Of Investement:</label>
        <input type="number" id="project_returns" name="project_returns" value={financeDetails.project_returns} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
      </div>
      <div className='flex justify-evenly'>
      <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700" onClick={() => navigate('/projectsdetails')}>Back</button>
      <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 " >Save</button>
      <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 " onClick={() => navigate('/benifitsdetails')}>Next</button>
      </div>    
      </form>
      <ToastContainer />
      </div>
</div>
    </>
  );
}

export default FinanceDetails;