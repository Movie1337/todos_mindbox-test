import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

describe("Todo App", () => {
  test("добавление новой задачи", () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText("What needs to be done?");

    fireEvent.change(inputElement, { target: { value: "Новая задача" } });

    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(screen.getByText("Новая задача")).toBeInTheDocument();
  });

  test("переключение состояния задачи", () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(inputElement, { target: { value: "Тестовая задача" } });
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    expect(screen.getByText("Тестовая задача")).toHaveStyle(
      "text-decoration: line-through"
    );
  });

  test("фильтрация задач", () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(inputElement, { target: { value: "Активная задача" } });
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    fireEvent.change(inputElement, { target: { value: "Выполненная задача" } });
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]);

    fireEvent.click(screen.getByText("Active"));
    expect(screen.getByText("Активная задача")).toBeInTheDocument();
    expect(screen.queryByText("Выполненная задача")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Completed"));
    expect(screen.queryByText("Активная задача")).not.toBeInTheDocument();
    expect(screen.getByText("Выполненная задача")).toBeInTheDocument();

    fireEvent.click(screen.getByText("All"));
    expect(screen.getByText("Активная задача")).toBeInTheDocument();
    expect(screen.getByText("Выполненная задача")).toBeInTheDocument();
  });

  test("скрытие и отображение списка задач", () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(inputElement, { target: { value: "Задача для теста" } });
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);

    expect(screen.queryByText("Задача для теста")).not.toBeInTheDocument();

    fireEvent.click(toggleButton);

    expect(screen.getByText("Задача для теста")).toBeInTheDocument();
  });
});
