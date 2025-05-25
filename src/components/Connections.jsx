import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { addConnection } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return <div>No Connections !!</div>;
  }

  return (
    <div className="flex justify-center flex-col my-10">
      <h1 className="text-bold text-white text-3xl mb-5 mx-auto">
        Connections
      </h1>
      {connections &&
        connections.map((conn) => (
          <div className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto items-center justify-between" key={conn._id}>
            <div className="">
              {conn.firstName} {conn.lastName}
            </div>
            <Link to={`/chat/${conn._id}`}>
              <button className="btn btn-secondary">Chat</button>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Connections;
