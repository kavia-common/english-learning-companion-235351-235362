export type ApiError = {
  message: string;
  status?: number;
  details?: unknown;
};

export type Lesson = {
  id: string;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  durationMinutes: number;
  sections: Array<{ heading: string; content: string }>;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  choices: string[];
  answerIndex: number; // local-only for mock; backend will not send correct answer
};

export type Quiz = {
  id: string;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  questionCount: number;
  questions?: QuizQuestion[];
};

export type ProgressSummary = {
  lessonsCompleted: number;
  averageQuizScore: number; // 0..100
  streakDays: number;
  vocabMastery: { known: number; learning: number; new: number };
};

export type VocabItem = {
  id: string;
  word: string;
  meaning: string;
  example: string;
  mastery: "new" | "learning" | "known";
};

export type SubmitQuizAttemptPayload = {
  quizId: string;
  answers: Array<{ questionId: string; choiceIndex: number }>;
  score?: number;
};

export type ReviewVocabPayload = {
  vocabId: string;
  result: "known" | "learning";
};

const DEFAULT_BASE_URL = "http://localhost:3001";

function getBaseUrl(): string {
  const envUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
  return (envUrl && envUrl.trim().length > 0 ? envUrl.trim() : DEFAULT_BASE_URL).replace(/\/+$/, "");
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${getBaseUrl()}${path.startsWith("/") ? "" : "/"}${path}`;

  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const contentType = res.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  let body: unknown = undefined;
  if (isJson) {
    try {
      body = await res.json();
    } catch {
      body = undefined;
    }
  } else {
    try {
      body = await res.text();
    } catch {
      body = undefined;
    }
  }

  if (!res.ok) {
    const err: ApiError = {
      message: `Request failed (${res.status})`,
      status: res.status,
      details: body,
    };
    throw err;
  }

  return body as T;
}

// PUBLIC_INTERFACE
export const api = {
  /** Fetch list of lessons. */
  async getLessons(): Promise<Lesson[]> {
    return requestJson<Lesson[]>("/lessons");
  },

  /** Fetch a single lesson by id. */
  async getLesson(id: string): Promise<Lesson> {
    return requestJson<Lesson>(`/lessons/${encodeURIComponent(id)}`);
  },

  /** Fetch available quizzes. */
  async getQuizzes(): Promise<Quiz[]> {
    return requestJson<Quiz[]>("/quizzes");
  },

  /** Submit a quiz attempt. */
  async submitQuizAttempt(payload: SubmitQuizAttemptPayload): Promise<{ ok: true }> {
    return requestJson<{ ok: true }>("/quizzes/attempts", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /** Fetch progress summary. */
  async getProgress(): Promise<ProgressSummary> {
    return requestJson<ProgressSummary>("/progress");
  },

  /** Fetch vocabulary list. */
  async getVocabList(): Promise<VocabItem[]> {
    return requestJson<VocabItem[]>("/vocab");
  },

  /** Review vocab item (mark known/learning). */
  async reviewVocab(payload: ReviewVocabPayload): Promise<{ ok: true }> {
    return requestJson<{ ok: true }>("/vocab/review", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
