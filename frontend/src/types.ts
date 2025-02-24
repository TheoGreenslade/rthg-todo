export type Task = {
  id: number;
  title: string;
  completed: "0" | "1";
  description: string | null;
};
