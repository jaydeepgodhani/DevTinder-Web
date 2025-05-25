import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async() => {
    try {
      await axios.post(BASE_URL + '/logout', {}, {withCredentials: true});
      dispatch(removeUser());
      return navigate('/login');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="navbar bg-base-100 shadow-sm flex justify-between">
      <div className="flex">
        <Link to="/feed" className="btn btn-ghost text-xl">
          daisyUI
        </Link>
      </div>
      <div className="flex">
        {user && (
          <div className="dropdown dropdown-end flex items-center">
            <div tabIndex={0} role="button">
              <p>Welcome, {user.firstName}</p>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
