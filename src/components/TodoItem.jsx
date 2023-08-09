import React from "react";

const TodoItem = ({ todo, handleOnDelete, handleOnUpdate }) => {
  return (
    <>
      <tbody>
        <tr>
          <td>{todo.id}</td>
          <td>{todo.description}</td>
          <td>{todo.targetDate}</td>
          <td>{todo.done.toString()}</td>
          <td>
            <button
              className="btn btn-warning me-2"
              onClick={() => {
                handleOnDelete(todo.id);
              }}
            >
              Delete
            </button>
            <button
              className="btn btn-success "
              onClick={() => {
                handleOnUpdate(todo.id);
              }}
            >
              Update
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default TodoItem;
