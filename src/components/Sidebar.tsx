import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-white text-customBlue p-5 border-2 ">
      <nav>
        <ul className="space-y-4 ">
          <li>
            <Link to="/" className="block py-2 px-4 rounded hover:bg-gray-200">
              Chart And Maps
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block py-2 px-4 rounded hover:bg-gray-200">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
