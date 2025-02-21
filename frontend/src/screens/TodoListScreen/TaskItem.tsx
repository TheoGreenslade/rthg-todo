import React from "react";
import { Task } from "../../types";

type TaskProps = {
  task: Task;
};

export const TaskItem = ({ task }: TaskProps) => {
  return (
    <div className="flex justify-center bg-gray-900 text-white p-2 rounded-lg shadow-md hover:bg-gray-800 transition duration-300 ease-in-out">
      {task.title}
    </div>
  );
};
