import "./reset.css";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoLists from "./components/TodoLists";
import CheckAllAndRemainingTests from "./components/CheckAllAndRemainingTests";
import FilterButton from "./components/FilterButtons";
import ClearButton from "./components/ClearButtons";
import { useCallback, useEffect, useState } from "react";

function App() {
  let [todos, setTodos] = useState([]);
  let [filterTodos, setFilterTodos] = useState(todos);
  let url = "http://localhost:3030/todos";

  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((todos) => {
        setTodos(todos);
        setFilterTodos(todos);
      });
  }, [url]);

  const addTodo = (todo) => {
    fetch("http://localhost:3030/todos", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    setTodos((perv) => [...perv, todo]);
  };

  const deleteTodo = (todoId) => {
    fetch(`http://localhost:3030/todos/${todoId}`, {
      method: "DELETE",
    });
    setTodos((prev) => {
      return prev.filter((todo) => {
        return todo.id !== todoId;
      });
    });
  };

  const updateTodo = (todo) => {
    fetch(`http://localhost:3030/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    setTodos((prev) => {
      return prev.map((t) => {
        if (t.id == todo.id) {
          return todo;
        }
        return t;
      });
    });
  };

  const checkAll = () => {
    todos.forEach((t) => {
      t.completed = true;
      updateTodo(t);
    });
    setTodos((prev) => {
      return prev.map((t) => {
        return { ...t, completed: true };
      });
    });
  };

  const clearCompleted = () => {
    todos.forEach(({ completed, id }) => {
      if (completed) {
        deleteTodo(id);
      }
    });
    setTodos((prev) => {
      return prev.filter((t) => {
        return !t.completed;
      });
    });
  };

  const filterBy = useCallback((filterState) => {
    if (filterState === "All") {
      setFilterTodos(todos);
    }
    if (filterState === "Active") {
      setFilterTodos(todos.filter((todo) => !todo.completed));
    }
    if (filterState === "Completed") {
      setFilterTodos(todos.filter((todo) => todo.completed));
    }
  },[todos]);

  let remaining_count = todos.filter((t) => !t.completed).length;

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        {/* Todo Form */}
        <TodoForm addTodo={addTodo} />

        {/* Todo Lists */}
        <TodoLists
          filterTodos={filterTodos}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />

        {/* Check all and Remaining tests */}
        <CheckAllAndRemainingTests
          remaining_count={remaining_count}
          checkAll={checkAll}
        />

        <div className="other-buttons-container">
          {/* Filter */}
          <FilterButton filterBy={filterBy} />

          {/* Clear */}
          <ClearButton clearCompleted={clearCompleted} />
        </div>
      </div>
    </div>
  );
}

export default App;
