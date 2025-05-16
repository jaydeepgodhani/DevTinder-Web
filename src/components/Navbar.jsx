import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const Navbar = () => {
  const user = useSelector(store => store.user);

  return (
    <div className="navbar bg-base-100 shadow-sm flex justify-between">
      <div className="flex">
        <Link to='/' className="btn btn-ghost text-xl">daisyUI</Link>
      </div>
      <div className="flex">

        {user && <div className="dropdown dropdown-end flex items-center">
          <div
            tabIndex={0}
            role="button"
          >
            <p>Welcome, {user.firstName}</p>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to='/profile' className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>}
      </div>
    </div>
  );
};

export default Navbar;
