export type DashboardStackParamList = {
  DashboardHome: undefined;
};

export type LessonsStackParamList = {
  LessonsHome: undefined;
  LessonDetail: { lessonId: string };
  LessonPractice: { lessonId: string };
};

export type QuizzesStackParamList = {
  QuizzesHome: undefined;
  QuizPlayer: { quizId: string };
  QuizResults: { quizId: string; score: number; total: number };
};

export type ProgressStackParamList = {
  ProgressHome: undefined;
};

export type TabParamList = {
  DashboardTab: undefined;
  LessonsTab: undefined;
  QuizzesTab: undefined;
  ProgressTab: undefined;
};
