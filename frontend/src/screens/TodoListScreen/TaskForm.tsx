import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { isAxiosError } from "axios";
import { FormInput } from "./FormInput";
import { Button } from "@headlessui/react";
import { FormTextarea } from "./FormTextArea";
import { Task } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksQueryKey } from "../../hooks/useTasks";

const TaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title must be at least 1 character")
    .max(50, "Title must be less than 50 characters"),
  description: z.string().nullable(),
});

type TaskFormInput = z.infer<typeof TaskSchema>;

const defaultValues: TaskFormInput = {
  title: "",
  description: "",
};

type TaskFormProps = {
  onSubmitSuccess: () => void;
};

export const TaskForm = ({ onSubmitSuccess }: TaskFormProps) => {
  const queryClient = useQueryClient();

  const { handleSubmit, control, setError, reset } = useForm<TaskFormInput>({
    defaultValues,
    resolver: zodResolver(TaskSchema),
  });

  const createTask = async (data: TaskFormInput): Promise<Task | undefined> => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/tasks`,
      data
    );
    return response.data;
  };

  const { mutate } = useMutation({
    mutationFn: createTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: tasksQueryKey });
      onSubmitSuccess();
      reset();
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const errors = error.response?.data.errors as {
          [key: string]: string;
        };
        for (const key in errors) {
          setError(key as keyof TaskFormInput, {
            message: errors[key],
          });
        }
      }
    },
  });

  const onSubmit = handleSubmit(async (data: TaskFormInput) => {
    mutate(data);
  });

  return (
    <div className="flex flex-col space-y-4 w-96">
      <form className="flex flex-col space-y-4">
        <FormInput name="title" label="Title" control={control} />
        <FormTextarea
          name="description"
          label="Description"
          control={control}
          rows={4}
        />
        <Button
          className="mt-4"
          type="submit"
          form="task-form"
          onClick={onSubmit}
        >
          Save
        </Button>
      </form>
    </div>
  );
};
