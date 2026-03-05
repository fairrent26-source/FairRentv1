import { create } from "zustand";

const AUTH_KEY = "fairrent-auth";

export type AuthRole = "landlord" | "tenant";

export interface AuthState {
  isLoggedIn: boolean;
  role: AuthRole | null;
  onboardingComplete: boolean;
  login: (role: AuthRole, isNewUser: boolean) => void;
  logout: () => void;
  completeOnboarding: () => void;
  rehydrate: () => void;
}

const defaultState = {
  isLoggedIn: false,
  role: null as AuthRole | null,
  onboardingComplete: false,
};

function loadPersisted(): typeof defaultState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return defaultState;
    const data = JSON.parse(raw) as typeof defaultState;
    return {
      isLoggedIn: !!data.isLoggedIn,
      role: data.role === "landlord" || data.role === "tenant" ? data.role : null,
      onboardingComplete: !!data.onboardingComplete,
    };
  } catch {
    return defaultState;
  }
}

function save(state: typeof defaultState) {
  if (typeof window === "undefined") return;
  try {
    if (!state.isLoggedIn) {
      localStorage.removeItem(AUTH_KEY);
    } else {
      localStorage.setItem(AUTH_KEY, JSON.stringify(state));
    }
  } catch {
    // ignore
  }
}

export const useAuthStore = create<AuthState>((set, get) => ({
  ...defaultState,
  login: (role, isNewUser) => {
    const state = {
      isLoggedIn: true,
      role,
      onboardingComplete: !isNewUser,
    };
    set(state);
    save(state);
  },
  logout: () => {
    set(defaultState);
    save(defaultState);
  },
  completeOnboarding: () => {
    const s = get();
    if (!s.role) return;
    const state = { ...s, onboardingComplete: true };
    set(state);
    save(state);
  },
  rehydrate: () => {
    set(loadPersisted());
  },
}));
