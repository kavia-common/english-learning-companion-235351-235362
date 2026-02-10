import type { Lesson, ProgressSummary, Quiz, VocabItem } from "./client";

export const mockLessons: Lesson[] = [
  {
    id: "l1",
    title: "Greetings & Introductions",
    difficulty: "Beginner",
    durationMinutes: 10,
    sections: [
      { heading: "Key phrases", content: "Hello, Hi, Nice to meet you, How are you?" },
      { heading: "Mini dialogue", content: "A: Hi! I'm Sam. B: Nice to meet you, Sam!" },
    ],
  },
  {
    id: "l2",
    title: "Daily Routines",
    difficulty: "Beginner",
    durationMinutes: 12,
    sections: [
      { heading: "Vocabulary", content: "wake up, commute, lunch break, finish work" },
      { heading: "Practice", content: "Describe your routine using simple present tense." },
    ],
  },
  {
    id: "l3",
    title: "Opinions & Preferences",
    difficulty: "Intermediate",
    durationMinutes: 15,
    sections: [
      { heading: "Useful structures", content: "I think..., In my opinion..., I'd rather..." },
      { heading: "Try it", content: "Share an opinion about a movie or a book you like." },
    ],
  },
];

export const mockQuizzes: Quiz[] = [
  {
    id: "q1",
    title: "Basic Greetings Quiz",
    difficulty: "Beginner",
    questionCount: 3,
    questions: [
      {
        id: "q1-1",
        prompt: "What is a polite greeting?",
        choices: ["Go away", "Hello", "Stop"],
        answerIndex: 1,
      },
      {
        id: "q1-2",
        prompt: "Choose the best response: “Nice to meet you.”",
        choices: ["Nice to meet you too.", "Good night.", "No thanks."],
        answerIndex: 0,
      },
      {
        id: "q1-3",
        prompt: "Fill in: “How ____ you?”",
        choices: ["are", "is", "am"],
        answerIndex: 0,
      },
    ],
  },
  {
    id: "q2",
    title: "Daily Routine Check",
    difficulty: "Beginner",
    questionCount: 2,
    questions: [
      {
        id: "q2-1",
        prompt: "Which verb fits: “I ____ breakfast at 8.”",
        choices: ["eat", "eats", "eating"],
        answerIndex: 0,
      },
      {
        id: "q2-2",
        prompt: "Which is a routine activity?",
        choices: ["commute", "yesterday", "maybe"],
        answerIndex: 0,
      },
    ],
  },
];

export const mockProgress: ProgressSummary = {
  lessonsCompleted: 7,
  averageQuizScore: 82,
  streakDays: 4,
  vocabMastery: { known: 45, learning: 22, new: 18 },
};

export const mockVocab: VocabItem[] = [
  {
    id: "v1",
    word: "streak",
    meaning: "a continuous series of successes",
    example: "I have a 4-day learning streak.",
    mastery: "learning",
  },
  {
    id: "v2",
    word: "commute",
    meaning: "travel regularly between home and work",
    example: "I commute by train.",
    mastery: "known",
  },
  {
    id: "v3",
    word: "preference",
    meaning: "a greater liking for one alternative",
    example: "I have a preference for tea.",
    mastery: "new",
  },
];
