import React from "react";

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  toggleTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo }) => {
  return (
    <li className={todo.completed ? "completed" : ""}>
      <input
        className="toggle"
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <label onClick={() => toggleTodo(todo.id)}>{todo.text}</label>
    </li>
  );
};

export default TodoItem;
