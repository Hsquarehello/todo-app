import React from "react";
import Todo from "../Todo";

export default function TodoLists({ filterTodos,deleteTodo,updateTodo }) {
  return (
    <ul className="todo-list">
      {filterTodos.map((todo) => (
        <Todo todo={todo} key={todo.id} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
      ))}
    </ul>
  );
}
