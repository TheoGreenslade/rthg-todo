import React from "react";
import useTasks from "../../hooks/useTasks";
import { TaskItem } from "./TaskItem";

export const TodoListScreen = () => {
  const { tasks } = useTasks();

  console.log(tasks);

  return (
    <div className="flex flex-col items-center w-screen h-screen bg-gray-950 pt-32">
      <h1 className="text-white text-3xl mb-8">Tasks</h1>
      <div className="flex flex-col w-1/2 gap-2">
        {tasks?.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
