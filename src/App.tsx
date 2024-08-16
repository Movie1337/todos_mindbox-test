import React, { useState } from "react";
import AddTodo from "./components/AddItem";
import TodoList from "./components/TodoList";
import "./index.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [showList, setShowList] = useState(true);

  const addTodo = (text: string) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const toggleListVisibility = () => {
    setShowList(!showList);
  };

  return (
    <div className="todo-app">
      <h1>todos</h1>
      <div className="new-todo-wrapper">
        <button
          className="toggle-list-visibility"
          onClick={toggleListVisibility}
          style={{ transform: showList ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          <img src="./arrow.png" alt="" />
        </button>
        <AddTodo addTodo={addTodo} />
      </div>
      {showList && (
        <section className="main">
          <TodoList todos={filteredTodos} toggleTodo={toggleTodo} />
        </section>
      )}
      <footer className="footer">
        <span className="todo-count">
          {todos.filter((todo) => !todo.completed).length} items left
        </span>
        <div className="filters">
          <a
            href="#/"
            className={filter === "all" ? "selected" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </a>
          <a
            href="#/active"
            className={filter === "active" ? "selected" : ""}
            onClick={() => setFilter("active")}
          >
            Active
          </a>
          <a
            href="#/completed"
            className={filter === "completed" ? "selected" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </a>
          <a className="clear-completed" onClick={clearCompleted}>
            Clear completed
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
