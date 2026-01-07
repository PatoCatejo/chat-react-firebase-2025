import {
  emailFriendZodSchema,
  type EmailFriendZodSchemaType,
} from "@/lib/zod.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { UseRoomActions } from "@/hooks/use-room-actions";
import { toast } from "sonner";

interface Props {
  handleClickRoomId: (id: string) => void;
}

const FormSearchFriend = ({ handleClickRoomId }: Props) => {
  const { findOrCreateRoom } = UseRoomActions();
  const [isLoading, startTransition] = useTransition();

  const form = useForm<EmailFriendZodSchemaType>({
    resolver: zodResolver(emailFriendZodSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: EmailFriendZodSchemaType) {
    startTransition(async () => {
      const response = await findOrCreateRoom(values.email);

      if (response.success) {
        handleClickRoomId(response.roomId);
        toast.success("¡Amigo encontrado! Comienza a chatear");
        form.reset();
        return;
      }

      toast.error(response.message);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-2 space-y-2 border-b border-slate-200"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Buscar por email..."
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
          className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
          disabled={isLoading}
        >
          <Search className="w-4 h-4" />
          {isLoading ? "Buscando..." : "Buscar"}
        </Button>
      </form>
    </Form>
  );
};
export default FormSearchFriend;
