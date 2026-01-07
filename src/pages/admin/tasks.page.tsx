import FormTask from "@/components/tasks/form-task";
import ListTask from "@/components/tasks/list-task";
import { Suspense } from "react";
import { ClipboardCheck } from "lucide-react";

const TasksPage = () => {
  return (
    <div className="h-screen bg-slate-50 p-4 md:p-6 overflow-auto">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <ClipboardCheck className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Mis Tareas</h1>
          </div>
          <p className="text-slate-500">Crea y gestiona tus tareas</p>
        </div>

        {/* Form */}
        <FormTask />

        {/* Tasks List */}
        <Suspense
          fallback={
            <div className="text-center text-slate-500">Cargando tareas...</div>
          }
        >
          <ListTask />
        </Suspense>
      </div>
    </div>
  );
};
export default TasksPage;
