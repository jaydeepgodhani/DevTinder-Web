import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [err, setErr] = useState();
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setErr(null);
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, about },
        { withCredentials: true }
      );
      console.log('res', res);

      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(()=> setShowToast(false) ,3000);
    } catch (err) {
      setErr(err.response.data);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="flex justify-center mx-10">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <fieldset className="fieldset">
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
              <legend className="fieldset-legend">Photo URL</legend>
              <input
                type="text"
                className="input"
                value={photoUrl}
                placeholder="Type photo url here"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
              <legend className="fieldset-legend">About</legend>
              <input
                type="text"
                className="input"
                value={about}
                placeholder="Type about here"
                onChange={(e) => setAbout(e.target.value)}
              />
            </fieldset>
            <p className="text-red-500">{err}</p>
            <div className="card-actions justify-center pt-5">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, about, photoUrl }} />
      {showToast && (
        <>
          <div className="toast toast-top toast-center">
            <div className="alert alert-info">
              <span>Profile saved succesfully</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EditProfile;
