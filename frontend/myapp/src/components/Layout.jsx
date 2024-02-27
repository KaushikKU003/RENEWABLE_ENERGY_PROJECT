import { Outlet, Link } from "react-router-dom"
const Layout = () => {
  return (
    <>
      <nav class="bg-red-300">
        <ul class="flex justify-evenly p-4 text-2xl font-extrabold">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/project">Projects</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;


