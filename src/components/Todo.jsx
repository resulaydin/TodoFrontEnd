import React, { useEffect, useState } from "react";
import { retrieveUserTodo, updateUserTodo } from "../api/apiCall";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import "../assets/style/css/formik.css";

const Todo = () => {
  const [todo, setTodo] = useState({
    description: "",
    targetDate: "",
  });
  const { id } = useParams();
  const { username } = useAuth().authInfo;
  const navigate = useNavigate();

  useEffect(() => {
    getUserTodo();
  }, []);

  const getUserTodo = async () => {
    try {
      const response = await retrieveUserTodo(username, id);
      console.log(response);
      setTodo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onchange = (event) => {
    const { value, name } = event.target;
    setTodo((previous) => ({
      ...previous,
      [name]: value,
    }));
  };
  const onUpdateUserTodo = async (event) => {
    event.preventDefault();
    try {
      const body = {
        ...todo,
      };
      await updateUserTodo(username, body);
      navigate("/todos");
    } catch (error) {
      console.log(error);
    }
  };

  const { description, targetDate } = todo;

  return (
    <div style={{ margin: "100px 50px  ", padding: "10px 80px" }}>
      <form
        className="shadow w-70 m-auto text-start"
        style={{ padding: "30px 50px" }}
      >
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">
            Description:
          </label>
          <input
            type="text"
            name="description"
            className="form-control"
            id="desc"
            value={description}
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="target-date" className="form-label">
            Target Date:
          </label>
          <input
            type="date"
            name="targetDate"
            className="form-control"
            id="target-date"
            value={targetDate}
            onChange={onchange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary form-control mt-5"
          onClick={onUpdateUserTodo}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Todo;
