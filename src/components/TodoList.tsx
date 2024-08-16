import React from "react";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: {
    id: number;
    text: string;
    completed: boolean;
  }[];
  toggleTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </ul>
  );
};

export default TodoList;
