import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { MessageCircle, ArrowRight, Zap, Lock, Users } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">FireChat</span>
          </div>
          <div className="flex items-center gap-3">
            <NavLink to="/auth/login">
              <Button variant="ghost" className="text-slate-600">
                Iniciar Sesión
              </Button>
            </NavLink>
            <NavLink to="/auth/register">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                Crear Cuenta
              </Button>
            </NavLink>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-20 md:py-32 space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900">
            Conecta con tus amigos
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-blue-600">
              de forma instantánea
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            FireChat es una plataforma de mensajería en tiempo real segura,
            rápida y fácil de usar. Comunícate sin límites.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <NavLink to="/auth/register">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-8 py-6 flex items-center gap-2">
              Comenzar Ahora
              <ArrowRight className="w-5 h-5" />
            </Button>
          </NavLink>
          <Button
            variant="outline"
            className="text-lg px-8 py-6 border-slate-300 text-slate-600"
          >
            Ver Demo
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            ¿Por qué elegir FireChat?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="space-y-4 p-6 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Rápido</h3>
              <p className="text-slate-600">
                Mensajes instantáneos con latencia mínima en tiempo real
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-4 p-6 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Seguro</h3>
              <p className="text-slate-600">
                Tus datos están protegidos con las mejores prácticas de
                seguridad
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-4 p-6 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Social</h3>
              <p className="text-slate-600">
                Conecta con amigos y mantén conversaciones significativas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="bg-linear-to-r from-blue-500 to-blue-600 rounded-lg p-12 text-center text-white space-y-6">
          <h2 className="text-3xl font-bold">¿Listo para conectar?</h2>
          <p className="text-lg opacity-90">
            Únete a miles de usuarios que ya disfrutan de FireChat
          </p>
          <NavLink to="/auth/register">
            <Button className="bg-white hover:bg-slate-100 text-blue-600 text-lg px-8 py-6">
              Crear Cuenta Gratis
            </Button>
          </NavLink>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-600">
          <p>&copy; 2026 FireChat. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};
export default HomePage;
