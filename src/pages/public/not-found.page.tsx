import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { AlertCircle, Home, MessageCircle } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-lg bg-red-100 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-slate-900">404</h1>
          <h2 className="text-2xl font-semibold text-slate-700">
            Página no encontrada
          </h2>
          <p className="text-slate-500">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <NavLink to="/" className="block">
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 justify-center">
              <Home className="w-4 h-4" />
              Volver al Inicio
            </Button>
          </NavLink>
          <NavLink to="/auth/login" className="block">
            <Button
              variant="outline"
              className="w-full border-slate-300 text-slate-600 flex items-center gap-2 justify-center"
            >
              <MessageCircle className="w-4 h-4" />
              Ir a FireChat
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default NotFoundPage;
