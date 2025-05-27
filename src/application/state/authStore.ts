import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthService } from '../../domain/ports/AuthService';
import { AuthServiceHttp } from '../../infrastructure/auth/AuthServiceHttp';


interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  userName: string | null;
  // Acitons
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, img?: File | string) => Promise<void>;
  logout: () => void;
}

const authService: AuthService = new AuthServiceHttp();

export const useAuthStore = create<AuthState>()(persist(
  (set) => ({
    token: null,
    isAuthenticated: false,
    userName: null,
    // Actions
    login: async ( email, password ) => {
      const token = await authService.login( email, password );
      set({ token, isAuthenticated: true });
    },
    register: async ( name, email, password, img ) => {
      const token = await authService.register( name, email, password, img );
      set({ token, isAuthenticated: true });
      set({ userName: name });
    },
    logout: () => {
      set({ token: null, isAuthenticated: false, userName: null });
    }
  }),
  {
    name: 'auth-storage',
    partialize: (state) => ({ token: state.token })
  }
));
