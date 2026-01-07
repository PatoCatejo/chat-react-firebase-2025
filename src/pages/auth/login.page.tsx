import CardFooterAuth from "@/components/card-footer-auth";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useAuthActions } from "@/hooks/use-auth-actions";
import { loginZodSchema, type LoginZodSchemaType } from "@/lib/zod.schemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LogIn, MessageCircle } from "lucide-react";

const LoginPage = () => {
  const { loading, login } = useAuthActions();

  const form = useForm<LoginZodSchemaType>({
    resolver: zodResolver(loginZodSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginZodSchemaType) => {
    const response = await login(data);
    if (!response.success) {
      if (response.error?.code === "auth/invalid-login-credentials") {
        form.setError("email", {
          type: "manual",
          message: "Email o contraseña inválidos",
        });

        form.setError("password", {
          type: "manual",
          message: "Email o contraseña inválidos",
        });
      }
      return;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
        </div>

        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-2">
              <LogIn className="w-5 h-5 text-blue-600" />
              <CardTitle>Iniciar Sesión</CardTitle>
            </div>
            <CardDescription>
              Ingresa tus credenciales para acceder a FireChat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="tu@email.com"
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">
                        Contraseña
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
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
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={loading}
                >
                  {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <CardFooterAuth type="login" loading={loading} />
      </div>
    </div>
  );
};
export default LoginPage;
