import { create } from "zustand";

type AppState = {
  displayName: string;
  lastLessonId?: string;
  lastQuizId?: string;
  setDisplayName: (name: string) => void;
  setLastLessonId: (id: string) => void;
  setLastQuizId: (id: string) => void;
};

// PUBLIC_INTERFACE
export const useAppStore = create<AppState>((set) => ({
  /** Lightweight state for session UI and last-viewed caching (offline-friendly). */
  displayName: "Learner",
  lastLessonId: undefined,
  lastQuizId: undefined,
  setDisplayName: (name) => set({ displayName: name }),
  setLastLessonId: (id) => set({ lastLessonId: id }),
  setLastQuizId: (id) => set({ lastQuizId: id }),
}));
