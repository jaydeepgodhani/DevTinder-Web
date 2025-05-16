import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector(store => store.user);
  console.log(user);


  return (
    <div className="navbar bg-base-100 shadow-sm flex justify-between">
      <div className="flex">
        <a className="btn btn-ghost text-xl">daisyUI</a>
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
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
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
