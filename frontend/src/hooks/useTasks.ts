import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Task } from "../types";
import axios from "axios";

export const tasksQueryKey = [`tasks`];

export type TasksResponse = {
  data: Task[];
};

export const useTasks = (): UseQueryResult<Task[]> => {
  const fetchData = async (): Promise<Task[]> => {
    const request = (await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/tasks`
    )) as {
      data: TasksResponse;
    };
    return request.data.data;
  };

  return useQuery({
    queryKey: tasksQueryKey,
    queryFn: fetchData,
  });
};
