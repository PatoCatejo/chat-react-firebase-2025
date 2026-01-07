import { useTaskActions } from "@/hooks/use-task-actions";
import ItemTask from "./item-task";

const ListTask = () => {
  const { tasks } = useTaskActions();

  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-400">No hay tareas aún. ¡Crea una nueva!</p>
        </div>
      ) : (
        tasks.map((task) => <ItemTask key={task.id} task={task} />)
      )}
    </div>
  );
};
export default ListTask;
