import { api, Lesson, ProgressSummary, Quiz, SubmitQuizAttemptPayload, VocabItem } from "./client";
import { mockLessons, mockProgress, mockQuizzes, mockVocab } from "./mockData";

// PUBLIC_INTERFACE
export async function fetchLessons(): Promise<Lesson[]> {
  /** Get lessons from backend; fallback to mock data if unavailable. */
  try {
    const lessons = await api.getLessons();
    if (Array.isArray(lessons) && lessons.length > 0) return lessons;
  } catch {
    // ignore and fallback
  }
  return mockLessons;
}

// PUBLIC_INTERFACE
export async function fetchLesson(id: string): Promise<Lesson> {
  /** Get a lesson by id; fallback to mock data if unavailable. */
  try {
    return await api.getLesson(id);
  } catch {
    const fallback = mockLessons.find((l) => l.id === id) ?? mockLessons[0];
    return fallback;
  }
}

// PUBLIC_INTERFACE
export async function fetchQuizzes(): Promise<Quiz[]> {
  /** Get quizzes from backend; fallback to mock data if unavailable. */
  try {
    const quizzes = await api.getQuizzes();
    if (Array.isArray(quizzes) && quizzes.length > 0) return quizzes;
  } catch {
    // ignore
  }
  return mockQuizzes.map(({ ...rest }) => rest); // list view doesn't need answers
}

// PUBLIC_INTERFACE
export async function fetchQuizWithQuestions(id: string): Promise<Quiz> {
  /** For now, quiz questions are locally mocked. */
  const local = mockQuizzes.find((q) => q.id === id);
  if (!local) return mockQuizzes[0];

  // If backend later provides questions, we can switch to an endpoint.
  return local;
}

// PUBLIC_INTERFACE
export async function submitQuizAttempt(payload: SubmitQuizAttemptPayload): Promise<void> {
  /** Submit attempt to backend if available; otherwise no-op. */
  try {
    await api.submitQuizAttempt(payload);
  } catch {
    // no-op: offline-friendly behavior
  }
}

// PUBLIC_INTERFACE
export async function fetchProgress(): Promise<ProgressSummary> {
  /** Get progress from backend; fallback to mock progress if unavailable. */
  try {
    return await api.getProgress();
  } catch {
    return mockProgress;
  }
}

// PUBLIC_INTERFACE
export async function fetchVocab(): Promise<VocabItem[]> {
  /** Get vocab list from backend; fallback to mock vocab if unavailable. */
  try {
    const list = await api.getVocabList();
    if (Array.isArray(list) && list.length > 0) return list;
  } catch {
    // ignore
  }
  return mockVocab;
}
