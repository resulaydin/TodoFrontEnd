import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HelloWorldPathVariable } from "../api/apiCall";

const Welcome = () => {
  const { username } = useParams();
  const [message, setMessage] = useState("");
  const onCallHelloWorld = async () => {
    try {
      // const response = await axios.get("http://localhost:8080/hello-world");
      const response = await HelloWorldPathVariable(username);
      console.log(response.data.message);
      setMessage(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-5" style={{ width: "50%", margin: "200px 300px" }}>
      <div className="fs-1">Welcom to our page {username}</div>
      <div className="fs-3">
        Manage your todos <Link to="/todos">Go Todos</Link>
      </div>
      <button className="btn btn-primary mt-3" onClick={onCallHelloWorld}>
        CallHelloWorld
      </button>
      <div className="text-info fs-4 pt-4">{message}</div>
    </div>
  );
};

export default Welcome;
