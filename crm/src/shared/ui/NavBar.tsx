import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuthStore } from "../../features/auth/authStore";
import { useLogout } from "../../features/auth/hooks/useLogout";

export type NavLink = {
  to: string;
  label: string;
};

type NavBarProps = {
  links: NavLink[];
};

export function NavBar({ links }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Mobile: topbar com hamburguer + usuário logado */}
      <div className="flex items-center justify-between border-b border-bone/10 px-4 py-3 sm:hidden">
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="flex items-center justify-center rounded-full p-2 text-cream/70 hover:text-ember"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {user && (
          <span className="text-xs text-cream/60">
            {user.email} ({user.role})
          </span>
        )}
      </div>

      {isOpen && (
        <nav className="absolute left-0 top-[57px] z-20 flex w-56 h-auto flex-col gap-1 border-b border-r border-bone/10 bg-elevated/95 p-4 shadow-2xl backdrop-blur-xl sm:hidden">
          <Link
            to="/"
            onClick={closeMenu}
            className="mb-2 text-cream/70 font-semibold hover:text-ember border-b border-bone/20 pb-3"
          >
            Coutinho Team CRM
          </Link>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className="rounded-xl py-2 text-sm text-cream/70 hover:bg-bone/10 hover:text-ember"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-5 w-full pt-2">
            <button
              type="button"
              onClick={() => {
                closeMenu();
                logout.mutate();
              }}
              className="text-left text-sm text-cream/70 hover:text-ember"
            >
              Sair
            </button>
          </div>
        </nav>
      )}

      {/* Desktop: sidebar fixa */}
      <aside className="hidden sm:flex sm:w-56 sm:shrink-0 sm:flex-col sm:border-r sm:border-bone/10 sm:bg-elevated/40 sm:px-4 sm:py-6">
        <Link to="/" className="mb-8 text-lg font-semibold hover:text-ember">
          Coutinho Team CRM
        </Link>

        <nav className="flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-xl px-3 py-2 text-sm text-cream/70 hover:bg-bone/10 hover:text-ember"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-2 border-t border-bone/10 pt-4">
          {user && (
            <div className="flex flex-col gap-1">
              <span className="text-xs text-cream/60">
                {user.email}
              </span>
              <span className="text-xs text-cream/60">({user.role})</span>
            </div>
          )}
          <button
            type="button"
            onClick={() => logout.mutate()}
            className="text-left text-sm text-cream/70 hover:text-ember"
          >
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}
