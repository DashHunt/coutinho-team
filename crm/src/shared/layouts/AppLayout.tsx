import { Link, Outlet } from "react-router-dom";
import { useAuthStore } from "../../features/auth/authStore";
import { useLogout } from "../../features/auth/hooks/useLogout";

export function AppLayout() {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();

  return (
    <div className="min-h-svh bg-base text-cream">
      <header className="flex items-center justify-between border-b border-bone/10 px-6 py-3">
        <div className="flex items-center gap-6">
          <span className="font-semibold">Coutinho Team CRM</span>
          <nav className="flex gap-4 text-sm text-cream/70">
            <Link to="/" className="hover:text-ember">
              Home
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-sm text-cream/70">
          {user && (
            <span>
              {user.email} ({user.role})
            </span>
          )}
          <button type="button" onClick={() => logout.mutate()} className="hover:text-ember">
            Sair
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
