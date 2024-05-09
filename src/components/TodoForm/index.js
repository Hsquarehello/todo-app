import React, { useState } from "react";

export default function TodoForm({ addTodo }) {
  let [body, setBody] = useState("");

  const formHandler = (e) => {
    e.preventDefault();
    function randomIntFromInterval(min, max) {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    let todo = {
      id: `${randomIntFromInterval(10,50)}`,
      body,
      completed: false,
    };
    addTodo(todo);
    setBody("");
  };

  return (
    <form action="#" onSubmit={formHandler}>
      <input
        type="text"
        className="todo-input"
        placeholder="What do you need to do?"
        onChange={(e) => setBody(e.target.value)}
        value={body}
      />
    </form>
  );
}
