import { create } from "zustand";

type AuthUser = {
  id: number;
  email: string;
  role: "ADMIN" | "COACH";
  team_id: number;
};

type AuthState = {
  accessToken: string | null;
  user: AuthUser | null;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
};

function decodeAccessToken(token: string): AuthUser {
  const payload = token.split(".")[1];
  const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(normalized));
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  setAccessToken: (token) => set({ accessToken: token, user: decodeAccessToken(token) }),
  clearAccessToken: () => set({ accessToken: null, user: null }),
}));
