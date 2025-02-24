import { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { TaskItem } from "./TaskItem";
import { CreateTaskDialog } from "./CreateTaskDialog";
import { Button } from "@headlessui/react";

export const TodoListScreen = () => {
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const { data } = useTasks();

  return (
    <div className="flex flex-col items-center w-screen h-screen bg-gray-950 pt-32">
      <h1 className="text-white text-3xl mb-8">Tasks</h1>
      <div className="flex flex-col w-1/2 gap-2">
        {data?.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        <Button onClick={() => setCreateTaskOpen(true)}>Add</Button>
      </div>
      <CreateTaskDialog
        open={createTaskOpen}
        onClose={() => setCreateTaskOpen(false)}
      />
    </div>
  );
};
