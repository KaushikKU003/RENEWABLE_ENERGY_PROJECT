// import logo from './logo.svg';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './components/Login/login';
import Layout from './components/Layout';
import Dashboard from './components/home'
import Project from './components/Project';
// import ProjectsLayout from './components/Project/AllPages/ProjectLayout';
import ProjectDetails from './components/Project/projectDetails';
import FinanceDetails from './components/Project/financeDetails';
import ProjectBenits from './components/Project/projectBenifits';
import ProjectRisks from './components/Project/projectRisks';
import ProjectLocation from './components/Project/locationDetails';
import ProjectOrganization from './components/Project/organisationDetails';

import ProjectSearch from './components/Project/projectSearch';
import { Toaster } from 'react-hot-toast';

// import LayoutApp from './components/Project/LayoutApp';
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/login" index element={<Login />} />
          <Route path="/" element={<Layout />}>
          <Route  index element={<Dashboard />} />
          
          <Route index element={<Dashboard />} />
          <Route path="/project" element={<Project />} />
        </Route>
          <Route path='/projectsdetails' element={<ProjectDetails/>}/>
          <Route path='/financesdetails' element={<FinanceDetails/>}/>

          <Route path='/benifitsdetails' element={<ProjectBenits/>}/>
          <Route path='/riskdetails' element={<ProjectRisks/>}/>
          <Route path='/locationdetails' element={<ProjectLocation/>}/>
          <Route path='/orgdetails' element={<ProjectOrganization/>}/>

          <Route path='/benifitsdetails' element={<ProjectDetails/>}/>
          <Route path='/risksdetails' element={<ProjectDetails/>}/>
          <Route path='/locationdetails' element={<ProjectDetails/>}/>
          <Route path='/orgdetails' element={<ProjectDetails/>}/>
          <Route path = '/dashboard' element={<Dashboard/>}/>
          <Route path = '/search' element={<ProjectSearch/>}/>
         
      </Routes>
    </BrowserRouter>
    <Toaster/>
    </>
   
  );
}

export default App;
