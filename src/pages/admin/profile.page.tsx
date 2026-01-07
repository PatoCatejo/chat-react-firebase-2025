import FormProfile from "@/components/profile/form-profile";
import { useUser } from "reactfire";
import { User } from "lucide-react";

const ProfilePage = () => {
  const { data: user } = useUser();

  if (!user) {
    return (
      <div className="h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500">Cargando perfil...</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-50 p-4 md:p-6 overflow-auto">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Mi Perfil</h1>
          </div>
          <p className="text-slate-500">Actualiza tu información personal</p>
        </div>

        {/* Form */}
        <FormProfile user={user} />
      </div>
    </div>
  );
};
export default ProfilePage;
