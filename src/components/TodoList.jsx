import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { deleteUserTodo, getUserTodos } from "../api/apiCall";
import { useAuth } from "../security/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState("");
  const { username } = useAuth().authInfo;
  const navigate = useNavigate();

  const { token } = useAuth();

  useEffect(() => {
    onUserTodosLoad(username);
  }, [username]);

  const onUserTodosLoad = async () => {
    try {
      const response = await getUserTodos(username, token);
      setTodos([...response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteTodo = async (id) => {
    try {
      const response = await deleteUserTodo(username, id);
      onUserTodosLoad();
      setMessage(`Delete todo with ${id} successful`);
    } catch (error) {
      console.log(error);
    }
  };
  const onUpdateTodo = async (id) => {
    navigate(`/todo/${id}`);
  };

  return (
    <div
      className="py-5 border border-3 shadow"
      style={{ margin: "100px 50px  ", padding: "10px 40px" }}
    >
      <h2 className="mb-5">Things You Want To Do! </h2>
      {message && <div className="alert alert-warning">{message}</div>}
      <table className="table text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Target Date</th>
            <th>Is Done?</th>
            <th></th>
          </tr>
        </thead>
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleOnDelete={onDeleteTodo}
              handleOnUpdate={onUpdateTodo}
            />
          );
        })}
      </table>
      <Link to="/todoFormik"> Add Todo</Link>
    </div>
  );
};

export default TodoList;
