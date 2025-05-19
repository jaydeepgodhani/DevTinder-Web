import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [err, setErr] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      return navigate("/feed");
    } catch (err) {
      setErr(err?.response?.data || "something went wrong");
      console.log(err);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          emailId,
          password,
          firstName,
          lastName
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setErr(err?.response?.data || "something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLogin ? "Login" : "Signup"}
          </h2>
          <fieldset className="fieldset">
            {!isLogin && (
              <>
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  placeholder="Type firstname here"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  placeholder="Type lastname here"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            )}

            <legend className="fieldset-legend">Email Id</legend>
            <input
              type="text"
              className="input"
              value={emailId}
              placeholder="Type email here"
              onChange={(e) => setEmailId(e.target.value)}
            />
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              className="input"
              value={password}
              placeholder="Type pwd here"
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <p className="text-red-500">{err}</p>
          <div className="card-actions justify-center pt-5">
            <button className="btn btn-primary" onClick={isLogin ? handleLogin : handleSignup}>
              {isLogin ? "Login" : "Signup"}
            </button>
          </div>
          <div className="m-auto pt-5 cursor-pointer" onClick={() => setIsLogin((value) => !value)}>
            {isLogin ? "New User ? SignUp here" : "Existing User ? Login here"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
