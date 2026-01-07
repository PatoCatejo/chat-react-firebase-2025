import { useProfileActions } from "@/hooks/use-profile-actions";
import { profileZodSchema, type ProfileZodSchemaType } from "@/lib/zod.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Save, Image as ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { User } from "firebase/auth";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

interface Props {
  user: User;
}

const FormProfile = ({ user }: Props) => {
  const { loading, updateUserProfile } = useProfileActions();

  const form = useForm<ProfileZodSchemaType>({
    resolver: zodResolver(profileZodSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
    },
  });

  async function onSubmit(values: ProfileZodSchemaType) {
    const result = await updateUserProfile(values);
    if (result.success) {
      return toast.success("Perfil actualizado correctamente");
    }
    toast.error("Error al actualizar el perfil");
  }

  return (
    <Card className="border-slate-200">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Photo Preview */}
          {form.watch("photoURL") && (
            <div className="flex justify-center">
              <img
                src={form.watch("photoURL")}
                alt="Vista previa"
                className="w-20 h-20 rounded-full object-cover border-4 border-blue-200"
              />
            </div>
          )}

          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700">Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tu nombre completo"
                    {...field}
                    className="border-slate-300 focus-visible:ring-blue-500"
                  />
                </FormControl>
                <FormDescription className="text-slate-500">
                  Este es tu nombre público
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="photoURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  URL de Foto de Perfil
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/photo.jpg"
                    {...field}
                    className="border-slate-300 focus-visible:ring-blue-500"
                  />
                </FormControl>
                <FormDescription className="text-slate-500">
                  Proporciona una URL válida de una imagen
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {loading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </form>
      </Form>
    </Card>
  );
};
export default FormProfile;
