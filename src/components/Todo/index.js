import React, { useState } from "react";

export default function Todo({ todo, deleteTodo,updateTodo }) {
  let [isEdit, setIsEdit] = useState(false);
  let [body, setBody] = useState(todo.body);
  let updated = {
    id: todo.id,
    body,
    completed: todo.completed
  }

  const handleTodo = (e) => {
    e.preventDefault();
    updateTodo(updated);
    setIsEdit(false)
  };

  const handleCheck = () => {
    let updated = {
      id: todo.id,
      body,
      completed: !todo.completed
    }
    updateTodo(updated)
  }

  return (
    <li className="todo-item-container">
      <div className="todo-item">
        <input type="checkbox" checked={todo.completed} onChange={handleCheck}/>
        {!isEdit && (
          <span
            onDoubleClick={() => setIsEdit(true)}
            className={`todo-item-label ${
              todo.completed ? "line-through" : ""
            }`}>
            {todo.body}
          </span>
        )}
        {isEdit && (
          <form onSubmit={handleTodo}>
            <input
              className="todo-item-input"
              type="text"
              value={body}
              onChange={(e) => {
                return setBody(e.target.value);
              }}
            />
          </form>
        )}

        {/* <input type="text" className="todo-item-input" value="Finish React Series" /> */}
      </div>

      <button className="x-button" onClick={() => deleteTodo(todo.id)}>
        <svg
          className="x-button-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </li>
  );
}
