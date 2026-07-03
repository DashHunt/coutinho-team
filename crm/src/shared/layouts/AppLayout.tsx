import { Outlet } from "react-router-dom";
import { useAuthStore } from "../../features/auth/authStore";
import { useLogout } from "../../features/auth/hooks/useLogout";

export function AppLayout() {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();

  return (
    <div>
      <header>
        <span>Coutinho Team CRM</span>
        {user && <span> — {user.email} ({user.role})</span>}
        <button type="button" onClick={() => logout.mutate()}>
          Sair
        </button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
