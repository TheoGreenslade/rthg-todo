import { Dialog, DialogPanel } from "@headlessui/react";
import { TaskForm } from "./TaskForm";

type CreateTaskDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const CreateTaskDialog = ({ open, onClose }: CreateTaskDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border-2 bg-gray-900 p-12 rounded-xl">
          <TaskForm onSubmitSuccess={onClose} />
        </DialogPanel>
      </div>
    </Dialog>
  );
};
