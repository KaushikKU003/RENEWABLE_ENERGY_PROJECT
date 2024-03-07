const ProjectsLayout = () => {
  const projectId=localStorage.getItem("project_id")
  return (
    <>
    <div className="bg-[#303030]">
    <div class="grid grid-cols-4 gap-x-4 bg-[#303030] p-2">
      <div className="group">
        <div class=" bg-[#6867677f] text-center py-2 rounded-lg border-gray-200 border-2  group-hover:bg-[#ffffff]  ">
          <a href={`/projectsdetails`} class="text-white font-extrabold tracking-wider group-hover:text-black ">Project Details</a>
        </div>
      </div>
      <div className="group">
  <div class="bg-[#6867677f] text-center py-2 rounded-lg border-gray-200 border-2 group-hover:bg-[#ffffff]">
    <a href={`/financesdetails/${projectId}`} class="text-white font-extrabold tracking-wider group-hover:text-black">Finance Details</a>
  </div>
      </div>
      <div className="group">
  <div class="bg-[#6867677f] text-center py-2 rounded-lg border-gray-200 border-2 group-hover:bg-[#ffffff]">
    <a href={`/benifitsdetails/${projectId}`} class="text-white font-extrabold tracking-wider group-hover:text-black">Project Benefits</a>
  </div>
      </div >
      <div className="group">
  <div class="bg-[#6867677f] text-center py-2 rounded-lg border-gray-200 border-2 group-hover:bg-[#ffffff]">
    <a href={`/riskdetails/${projectId}`} class="text-white font-extrabold tracking-wider group-hover:text-black">Project Risks</a>
  </div>
      </div>
  </div>
  <div class='flex  justify-around bg-[#303030] p-2'>
    <div className="group">
  <div class="bg-[#6867677f] text-center py-2 px-24 rounded-lg border-gray-200 border-2 group-hover:bg-[#ffffff]">
    <a href={`/locationdetails/${projectId}`} class="text-white font-extrabold block tracking-wider group-hover:text-black">Location Details</a>
  </div>
    </div>
    <div className="group">
  <div class="bg-[#6867677f] text-center py-2 px-24 rounded-lg border-gray-200 border-2 group-hover:bg-[#ffffff]">
    <a href={`/orgdetails/${projectId}`} class="text-white font-extrabold block tracking-wider group-hover:text-black">Organization Details</a>
  </div>
    </div>
</div>
    </div>
    </>
  );
};

export default ProjectsLayout;

// import React, { useState } from 'react';

// const ProjectsLayout = () => {
//   const [activeLink, setActiveLink] = useState('');

//   const handleLinkClick = (link) => {
//     setActiveLink(link);
//   };

//   return (
//     <>
//       <div className="grid grid-cols-4 gap-4">
//         <div className={`bg-${activeLink === 'projectsdetails' ? 'Purple-700' : 'black'} text-center py-2 rounded-lg`}>
//           <a href="/projectsdetails" className={`text-white font-extrabold`} onClick={() => handleLinkClick('projectsdetails')}>Project Details</a>
//         </div>
//         <div className={`bg-${activeLink === 'financesdetails' ? 'red-600' : 'black'} text-center py-2 rounded-lg`}>
//           <a href="/financesdetails" className="text-white font-extrabold" onClick={() => handleLinkClick('financesdetails')}>Finance Details</a>
//         </div>
//         <div className={`bg-${activeLink === 'benefits' ? 'red-600' : 'black'} text-center py-2 rounded-lg`}>
//           <a href="/benefits" className="text-white font-extrabold" onClick={() => handleLinkClick('benefits')}>Benefits</a>
//         </div>
//         <div className={`bg-${activeLink === 'risks' ? 'red-600' : 'black'} text-center py-2 rounded-lg`}>
//           <a href="/risks" className="text-white font-extrabold" onClick={() => handleLinkClick('risks')}>Risks</a>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProjectsLayout;


// import React, { useState } from 'react';

// const ProjectsLayout = ({ activeLink, handleLinkClick, initialBackgroundColor }) => {
//   const [backgroundColor, setBackgroundColor] = useState(initialBackgroundColor);

//   return (
//     <>
//       <div className="grid grid-cols-4 gap-4" style={{ backgroundColor: backgroundColor }}>
//         <div className={`text-center py-2 rounded-lg ${activeLink === 'projectsdetails' ? 'bg-red-600 text-white' : 'bg-black text-white'}`}>
//           <a href="/projectsdetails" className="font-extrabold" onClick={() => handleLinkClick('projectsdetails')}>Project Details</a>
//         </div>
//         <div className={`text-center py-2 rounded-lg ${activeLink === 'financesdetails' ? 'bg-red-600 text-white' : 'bg-black text-white'}`}>
//           <a href="/financesdetails" className="font-extrabold" onClick={() => handleLinkClick('financesdetails')}>Finance Details</a>
//         </div>
//         <div className={`text-center py-2 rounded-lg ${activeLink === 'benefits' ? 'bg-red-600 text-white' : 'bg-black text-white'}`}>
//           <a href="/benefits" className="font-extrabold" onClick={() => handleLinkClick('benefits')}>Benefits</a>
//         </div>
//         <div className={`text-center py-2 rounded-lg ${activeLink === 'risks' ? 'bg-red-600 text-white' : 'bg-black text-white'}`}>
//           <a href="/risks" className="font-extrabold" onClick={() => handleLinkClick('risks')}>Risks</a>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProjectsLayout;

// import React from 'react';

// const ProjectsLayout = ({ backgroundColor, setBackgroundColor }) => {
//   return (
//     <>
//       <div className="grid grid-cols-4 gap-4" style={{ backgroundColor: backgroundColor }}>
//         {/* Links and click handlers here */}
//       </div>
//     </>
//   );
// };

// export default ProjectsLayout;







