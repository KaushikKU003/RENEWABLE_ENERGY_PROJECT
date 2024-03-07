import { Outlet, Link } from "react-router-dom"
const Layout = () => {
  return (
    <>
      <nav class="bg-[#303030]">
        <ul class="flex justify-evenly p-4 text-2xl font-extrabold">
          <li>
            <Link to="/" className="text-white font-monospace text-3xl">Dashboard</Link>
          </li>
          <li>
            <Link to="/project" className="text-white font-monospace text-3xl">Projects</Link>
          </li>
          <li>
            <Link to="/contact" className="text-white font-monospace text-3xl">Contact</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;


