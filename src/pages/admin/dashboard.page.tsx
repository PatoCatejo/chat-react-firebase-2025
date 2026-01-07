import { Button } from "@/components/ui/button";
import { useAuthActions } from "@/hooks/use-auth-actions";
import { useUser } from "reactfire";
import { Card } from "@/components/ui/card";
import {
  LayoutDashboard,
  Mail,
  User as UserIcon,
  LogOut,
  MessageSquare,
  CheckSquare,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router";

const DashboardPage = () => {
  const { data: user } = useUser();
  const { logout } = useAuthActions();
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-slate-50 p-4 md:p-6 overflow-auto">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          </div>
          <p className="text-slate-500">
            Bienvenido de vuelta, {user?.displayName || "Usuario"}
          </p>
        </div>

        {/* User Info Card */}
        <Card className="border-slate-200">
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-blue-600" />
              Tu Información
            </h2>

            {/* Profile Picture */}
            <div className="flex justify-center">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Perfil"
                  className="w-24 h-24 rounded-full border-4 border-blue-200 object-cover"
                  onError={(e) => {
                    // Si la imagen no carga, mostrar el avatar de fallback
                    const img = e.target as HTMLImageElement;
                    img.style.display = "none";
                    const parent = img.parentElement;
                    if (parent) {
                      const fallback = document.createElement("div");
                      fallback.className =
                        "w-24 h-24 rounded-full border-4 border-blue-200 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center";
                      fallback.innerHTML = `<span class="text-4xl font-bold text-white">${(
                        user?.displayName ||
                        user?.email ||
                        "U"
                      )
                        .charAt(0)
                        .toUpperCase()}</span>`;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-blue-200 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">
                    {(user?.displayName || user?.email || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* User Details */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <div>
                <p className="text-sm font-medium text-slate-500">Nombre</p>
                <p className="text-lg text-slate-900">
                  {user?.displayName || "No especificado"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-500">Email</p>
                  <p className="text-lg text-slate-900">
                    {user?.email || "No disponible"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-600">
            Acciones Rápidas
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => navigate("/admin/chat")}
              className="bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Mensajes
            </Button>
            <Button
              onClick={() => navigate("/admin/tasks")}
              className="bg-cyan-500 hover:bg-cyan-600 text-white flex items-center justify-center gap-2"
            >
              <CheckSquare className="w-4 h-4" />
              Tareas
            </Button>
            <Button
              onClick={() => navigate("/admin/profile")}
              className="bg-purple-500 hover:bg-purple-600 text-white flex items-center justify-center gap-2"
            >
              <UserIcon className="w-4 h-4" />
              Perfil
            </Button>
            <Button className="bg-slate-400 hover:bg-slate-500 text-white flex items-center justify-center gap-2">
              <Settings className="w-4 h-4" />
              Ajustes
            </Button>
          </div>
          <Button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
