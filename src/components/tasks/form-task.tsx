import { taskZodSchema, type TaskZodSchemaType } from "@/lib/zod.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { useTaskActions } from "@/hooks/use-task-actions";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

const FormTask = () => {
  const [isPending, startTransition] = useTransition();

  const { createTask } = useTaskActions();

  const form = useForm<TaskZodSchemaType>({
    resolver: zodResolver(taskZodSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: TaskZodSchemaType) {
    startTransition(async () => {
      try {
        await createTask(values);
        form.reset();
        toast.success("Tarea creada correctamente");
      } catch (error) {
        console.log(error);
        toast.error("Error al crear la tarea");
      }
    });
  }

  return (
    <Card className="border-slate-200">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">Nueva Tarea</h3>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700">Título</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Escribe el título de la tarea..."
                    {...field}
                    className="border-slate-300 focus-visible:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700">Descripción</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Descripción (opcional)"
                    {...field}
                    className="border-slate-300 focus-visible:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {isPending ? "Creando..." : "Crear Tarea"}
          </Button>
        </form>
      </Form>
    </Card>
  );
};
export default FormTask;
