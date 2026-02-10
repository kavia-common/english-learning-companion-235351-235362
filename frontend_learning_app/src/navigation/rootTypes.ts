import type { NavigatorScreenParams } from "@react-navigation/native";

import type { LessonsStackParamList, QuizzesStackParamList, TabParamList } from "./types";

/**
 * Root navigation types for the app. We keep this lightweight and focused on
 * screen-level navigation usage to avoid `any` in screens.
 */
export type RootStackParamList = TabParamList & {
  // Nested stack routes (reachable from within tab stacks).
  LessonsTab: NavigatorScreenParams<LessonsStackParamList> | undefined;
  QuizzesTab: NavigatorScreenParams<QuizzesStackParamList> | undefined;

  // Deep routes (when navigating directly by screen name).
  LessonDetail: LessonsStackParamList["LessonDetail"];
  LessonPractice: LessonsStackParamList["LessonPractice"];
  QuizPlayer: QuizzesStackParamList["QuizPlayer"];
  QuizResults: QuizzesStackParamList["QuizResults"];
};
