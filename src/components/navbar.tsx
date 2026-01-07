import { useAuthActions } from "@/hooks/use-auth-actions";
import {
  LayoutDashboard,
  LogOut,
  MessageCircle,
  User,
  ClipboardCheck,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Chat", href: "/admin/chat", icon: MessageCircle },
  { name: "Profile", href: "/admin/profile", icon: User },
  { name: "Tasks", href: "/admin/tasks", icon: ClipboardCheck },
];

const Navbar = () => {
  const { logout } = useAuthActions();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md border-b border-slate-200 sticky top-0 z-50">
      <nav className="px-4 py-3 flex justify-between items-center">
        {/* Logo/Title */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900 hidden sm:inline">
            FireChat
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 rounded-lg flex items-center gap-2 transition-colors",
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-slate-600 hover:bg-slate-100"
                )
              }
              end
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Desktop Logout */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            onClick={logout}
            variant="ghost"
            size="sm"
            className="text-slate-600 hover:bg-slate-100"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden lg:inline">Logout</span>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-slate-600" />
          ) : (
            <Menu className="w-6 h-6 text-slate-600" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-slate-50">
          <div className="flex flex-col gap-1 p-3">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-3 rounded-lg flex items-center gap-3 transition-colors",
                    isActive
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : "text-slate-600 hover:bg-white"
                  )
                }
                end
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </NavLink>
            ))}
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="px-4 py-3 rounded-lg flex items-center gap-3 text-slate-600 hover:bg-white transition-colors w-full text-left"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
