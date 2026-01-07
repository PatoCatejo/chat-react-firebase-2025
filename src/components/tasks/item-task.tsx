import { useTaskActions } from "@/hooks/use-task-actions";
import { cn } from "@/lib/utils";
import type { Task } from "@/schemas/task.schema";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { Check, Trash2 } from "lucide-react";
import { Card } from "../ui/card";

interface Props {
  task: Task;
}

const ItemTask = ({ task }: Props) => {
  const { deleteTask, toggleTaskCompletion } = useTaskActions();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        await deleteTask(task.id);
        toast.success("Tarea eliminada");
      } catch (error) {
        console.log(error);
        toast.error("Error al eliminar la tarea");
      }
    });
  };

  const handleToggleCompletion = async () => {
    startTransition(async () => {
      try {
        await toggleTaskCompletion(task.id);
        toast.success(
          task.completed ? "Tarea marcada como pendiente" : "Tarea completada"
        );
      } catch (error) {
        console.log(error);
        toast.error("Error al actualizar la tarea");
      }
    });
  };

  return (
    <Card className="border-slate-200 hover:shadow-md transition-shadow">
      <div className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          <button
            onClick={handleToggleCompletion}
            disabled={isPending}
            className={cn(
              "mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors",
              task.completed
                ? "bg-green-500 border-green-500"
                : "border-slate-300 hover:border-blue-500"
            )}
          >
            {task.completed && <Check className="w-4 h-4 text-white" />}
          </button>

          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                "font-semibold text-slate-900",
                task.completed && "line-through text-slate-400"
              )}
            >
              {task.title}
            </h3>
            {task.description && (
              <p
                className={cn(
                  "text-sm text-slate-600",
                  task.completed && "text-slate-400 line-through"
                )}
              >
                {task.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-2 ml-9">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleCompletion}
            disabled={isPending}
            className="text-blue-600 hover:bg-blue-50"
          >
            {task.completed ? "Desmarcar" : "Completar"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={isPending}
            className="text-red-600 hover:bg-red-50 ml-auto"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
export default ItemTask;
