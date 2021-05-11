import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Task, TaskId, Todos } from "./types";
import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";
import MissingPriorities from "./components/MissingPriorities";

function App() {
  // We intentionally support multiple tasks of the same priority
  // Example use case: I must send two emails of the same importance

  const createNewTask = (priority: number, description: string) => {
    setTodos((prevTodos) => {
      const newTaskId = new Date().getTime();
      const newTask: Task = {
        description,
        isCompleted: false,
      };
      const newTodos = { ...prevTodos };

      if (newTodos[priority]) {
        // The priority level already exists
        newTodos[priority].set(newTaskId, newTask);
      } else {
        // The priority level does not exist
        newTodos[priority] = new Map([[newTaskId, newTask]]);
      }

      return newTodos;
    });
  };

  const deleteTask = (priority: number, taskId: TaskId) => {
    setTodos((prevTodos) => {
      const newTodos = { ...prevTodos };

      if (newTodos[priority] && newTodos[priority].get(taskId)) {
        // The specified task exists
        if (newTodos[priority].size === 1) {
          // No more tasks of that priority, delete the map
          delete newTodos[priority];
        } else {
          // Remove the task from the map
          newTodos[priority].delete(taskId);
        }
      }

      return newTodos;
    });
  };

  const completeTask = (priority: number, taskId: TaskId) => {
    setTodos((prevTodos) => {
      const newTodos = { ...prevTodos };

      if (newTodos[priority] && newTodos[priority].get(taskId)) {
        // The specified task exists
        newTodos[priority].get(taskId)!.isCompleted = true;
      }

      return newTodos;
    });
  };

  // Use the millisecond when the task was created as a unique key for each task -- replace with UUID when scaling to more users to avoid collision
  const initialTaskId = new Date().getTime();
  const initialTask: Task = {
    description: "This is the first task on your todo list! Add some more.",
    isCompleted: false,
  };
  // Similar to a priority queue; todos object maps a priority to an object with tasks of that priority.
  // Could also use a linked list implementation of priority queue
  // The inner Map maps taskIds to tasks
  const [todos, setTodos] = useState<Todos>({
    1: new Map<TaskId, Task>([[initialTaskId, initialTask]]),
  });

  // O(n) is the best conceivable runtime for a render where n is the number of tasks
  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">OpsLevel Todo List</h1>

        <TodoForm createNewTask={createNewTask} />
        <MissingPriorities
          priorities={Object.keys(todos).map((key) => parseInt(key))}
        />
        <div>
          {Object.keys(todos)
            .sort()
            .map((priority) => {
              const tasks: JSX.Element[] = [];
              todos[parseInt(priority)].forEach((task, taskId) => {
                tasks.push(
                  <TodoItem
                    key={taskId}
                    priority={parseInt(priority)}
                    task={task}
                    taskId={taskId}
                    completeTask={completeTask}
                    deleteTask={deleteTask}
                  />
                );
              });
              return tasks;
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
