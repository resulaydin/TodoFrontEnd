import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { getUserTodos } from "../api/apiCall";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const today = new Date();
  const targetDate = new Date(
    today.getFullYear() + 12,
    today.getMonth(),
    today.getDay()
  );
  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     description: "React handled",
  //     targetDate: targetDate.toDateString(),
  //     done: false,
  //   },
  //   {
  //     id: 2,
  //     description: "JSP handled",
  //     targetDate: targetDate.toDateString(),
  //     done: false,
  //   },
  //   {
  //     id: 3,
  //     description: "Spring Boot handled",
  //     targetDate: targetDate.toDateString(),
  //     done: false,
  //   },
  //   {
  //     id: 4,
  //     description: "Bootstrap handled",
  //     targetDate: targetDate.toDateString(),
  //     done: false,
  //   },
  // ]);

  useEffect(() => {
    onUserTodosLoad();
  }, []);

  const onUserTodosLoad = async () => {
    try {
      const response = await getUserTodos("resul");
      console.log(response);
      setTodos([...response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="py-5 border border-3 shadow"
      style={{ margin: "100px 50px  ", padding: "10px 40px" }}
    >
      <h2 className="mb-5">Things You Want To Do! </h2>
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
          return <TodoItem key={todo.id} todo={todo} />;
        })}
      </table>
    </div>
  );
};

export default TodoList;
