import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, about, _id } = user;

  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      console.log('here...');

      dispatch(removeFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-sm p-4">
      <figure>
        <img src={photoUrl} alt="User" className="h-96 object-cover w-96" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <p>{about}</p>
        <div className="card-actions justify-center m-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
