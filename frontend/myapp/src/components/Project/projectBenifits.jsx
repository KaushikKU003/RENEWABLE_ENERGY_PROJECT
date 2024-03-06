import ProjectsLayout from "./ProjectLayout";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const ProjectBenefits = () => {
  const [benefits, setBenefits] = useState({
    co2_reduction: "",
    other_benefits: "",
  });
  const navigate = useNavigate();
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("benefitsDetails"));
    if (storedData) {
      setBenefits(storedData);
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the form data
    handleSuccess("Project Benifits Details Saved");
    setTimeout(() => {}, 500);
    console.log(benefits);
    localStorage.setItem("benefitsDetails", JSON.stringify(benefits));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBenefits((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const NavigationFront = () => {
    const projectId = localStorage.getItem("project_id");
    navigate(`/riskdetails/${projectId}`);
  };
  const NavigationBack = () => {
    const projectId = localStorage.getItem("project_id");
    navigate(`/financesdetails/${projectId}`);
  };
  return (
    <>
      <ProjectsLayout />
      <div className="min-h-[95vh] div-bg flex justify-center items-baseline">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[50%] mx-auto mt-10">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Benefits Details
          </h1>
          <form class="max-w-[75%] m-auto " onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="co2_reduction"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Project CO2 Reduction Percentage:
              </label>
              <input
                type="number"
                id="co2_reduction"
                name="co2_reduction"
                value={benefits.co2_reduction}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label
                htmlFor="other_benefits"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Other Project Benefits:
              </label>
              <input
                type="text"
                id="other_benefits"
                name="other_benefits"
                value={benefits.other_benefits}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-evenly">
              <button
                type="submit"
                className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                onClick={NavigationBack}
              >
                Back
              </button>
              <button
                type="submit"
                className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 "
              >
                Save
              </button>
              <button
                type="submit"
                className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 "
                onClick={NavigationFront}
              >
                Next
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default ProjectBenefits;
