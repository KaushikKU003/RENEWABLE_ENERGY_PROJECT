// import logo from './logo.svg';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './components/Login/login';
import Layout from './components/Layout';
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route path="blogs" element={<Blogs />} /> */}
        </Route>
          <Route index element={<Login />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
