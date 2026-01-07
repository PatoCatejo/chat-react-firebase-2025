import { useAuthActions } from "@/hooks/use-auth-actions";
import { Button } from "./ui/button";
import { CardFooter } from "./ui/card";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { Link } from "react-router";

interface Props {
  type: "login" | "register";
  loading: boolean;
}

const CardFooterAuth = ({ type, loading }: Props) => {
  const isLogin = type === "login";

  const { loginWithGoogle } = useAuthActions();

  const handleLoginWithGoogle = async () => {
    const result = await loginWithGoogle();
    if (result.success) {
      console.log("Login successful");
    } else {
      console.error("Login failed:", result.error);
      toast.error("Error al iniciar sesión. Intenta de nuevo.");
    }
  };

  return (
    <CardFooter className="flex flex-col items-center gap-4 border-t border-slate-200 pt-4">
      <div className="w-full">
        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200"></span>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500">o</span>
          </div>
        </div>

        <Button
          onClick={handleLoginWithGoogle}
          className="w-full border-slate-300 text-slate-600 hover:bg-slate-50"
          disabled={loading}
          variant="outline"
        >
          <Mail className="w-4 h-4 mr-2" />
          {isLogin ? "Inicia sesión" : "Regístrate"} con Google
        </Button>
      </div>

      <p className="text-center text-sm text-slate-600">
        {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
        <Link
          to={isLogin ? "/auth/register" : "/auth/login"}
          className="inline"
        >
          <Button
            variant="link"
            className="p-0 h-auto font-semibold text-blue-600 hover:text-blue-700"
          >
            {isLogin ? "Crear una aquí" : "Inicia sesión aquí"}
          </Button>
        </Link>
      </p>
    </CardFooter>
  );
};
export default CardFooterAuth;
