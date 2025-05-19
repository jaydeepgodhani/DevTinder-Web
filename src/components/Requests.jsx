import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) {
    return <div>No requests !!</div>;
  }

  return (
    <div className="flex justify-center items-center my-10 flex-col">
      <h1 className="text-bold text-white text-3xl mb-5">
        Connections Requests
      </h1>
      {requests &&
        requests.map((conn) => {
          return (
            <div
              key={conn._id}
              className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto items-center justify-between"
            >
              <span className="pl-2">
                {conn.fromUserId.firstName} {conn.fromUserId.lastName}
              </span>
              <div>
                <button className="btn btn-primary mx-2">Reject</button>
                <button className="btn btn-secondary mx-2">Accept</button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Requests;
