import { Outlet } from "react-router-dom";
import { NavBar } from "../ui/NavBar";

const NAV_LINKS = [{ to: "/leads", label: "Leads" }];

export function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-base text-cream sm:flex-row">
      <NavBar links={NAV_LINKS} />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
