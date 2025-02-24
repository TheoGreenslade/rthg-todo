import { Checkbox } from "@headlessui/react";
import { Task } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { tasksQueryKey } from "../../hooks/useTasks";

type TaskProps = {
  task: Task;
};

export const TaskItem = ({ task }: TaskProps) => {
  const queryClient = useQueryClient();

  const toggleCompletedStatus = async (completed: boolean) => {
    await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${task.id}`,
      {
        completed,
      }
    );
  };

  const { mutate } = useMutation({
    mutationFn: toggleCompletedStatus,
    onSuccess: async () => {
      const tasks = queryClient.getQueryData<Task[]>(tasksQueryKey) || [];

      await queryClient.setQueryData(
        tasksQueryKey,
        tasks.map((t) => {
          if (t.id === task.id) {
            return { ...t, completed: !t.completed };
          }
          return t;
        })
      );
    },
  });

  console.log("task", task.completed);

  return (
    <div className="relative flex justify-center bg-gray-900 text-white p-2 rounded-lg shadow-md hover:bg-gray-800 transition duration-200 ease-in-out">
      {task.title}
      <Checkbox
        checked={!!task.completed}
        onClick={() => mutate(!task.completed)}
        className="absolute right-4 top-3 group block size-5 rounded border bg-gray-700 p-0.5"
      >
        <svg
          className="stroke-white opacity-0 group-data-[checked]:opacity-100"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M3 8L6 11L11 3.5"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Checkbox>
    </div>
  );
};
